# A/B Testing Feature Flag Utility in JavaScript

Here's a comprehensive implementation of a feature flag utility for A/B testing that can be used across a web application:

```javascript
/**
 * Feature Flag Utility for A/B Testing
 *
 * Provides a centralized way to manage feature flags and determine
 * which features should be shown to which users.
 */
class FeatureFlags {
  constructor() {
    // Hardcoded feature flag configuration
    // In a real app, this would come from an API or config service
    this.flags = {
      // Feature name: { configuration }
      newDashboard: {
        enabled: true,
        rolloutPercentage: 30, // 30% of users will see this
        userGroups: ["beta-testers", "premium"],
        excludeUsers: ["user123", "user456"],
      },
      darkMode: {
        enabled: true,
        rolloutPercentage: 100, // All users
        userGroups: ["all"],
      },
      chatWidget: {
        enabled: false, // Completely disabled
        rolloutPercentage: 0,
      },
      advancedAnalytics: {
        enabled: true,
        rolloutPercentage: 10, // 10% of users
        userGroups: ["analytics-team", "admin"],
      },
    };

    // Current user information (would normally come from auth/session)
    this.currentUser = {
      id: "user789",
      groups: ["free-tier", "beta-testers"],
    };
  }

  /**
   * Check if a feature is enabled for the current user
   * @param {string} featureName - The name of the feature to check
   * @returns {boolean} - Whether the feature is enabled for the current user
   */
  isEnabled(featureName) {
    const feature = this.flags[featureName];

    if (!feature) {
      console.warn(`Feature "${featureName}" not found in feature flags`);
      return false;
    }

    // If feature is completely disabled
    if (!feature.enabled) {
      return false;
    }

    // Check if user is explicitly excluded
    if (
      feature.excludeUsers &&
      feature.excludeUsers.includes(this.currentUser.id)
    ) {
      return false;
    }

    // Check if user is in any of the allowed groups
    const hasGroupAccess =
      feature.userGroups &&
      feature.userGroups.some((group) =>
        this.currentUser.groups.includes(group)
      );

    if (hasGroupAccess) {
      return true;
    }

    // Check rollout percentage for users not in specific groups
    if (feature.rolloutPercentage) {
      // Generate a consistent hash-based percentage for the user
      const userPercentage = this._getUserPercentage(
        this.currentUser.id,
        featureName
      );
      return userPercentage <= feature.rolloutPercentage;
    }

    return false;
  }

  /**
   * Get a consistent percentage (0-100) for a user/feature combination
   * @private
   * @param {string} userId - The user ID
   * @param {string} featureName - The feature name
   * @returns {number} - A consistent percentage (0-100) for this user/feature
   */
  _getUserPercentage(userId, featureName) {
    // Simple hash function to create a consistent percentage for the user
    const hashString = `${userId}-${featureName}`;
    let hash = 0;

    for (let i = 0; i < hashString.length; i++) {
      const char = hashString.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }

    return Math.abs(hash) % 100;
  }

  /**
   * Get all features available to the current user
   * @returns {object} - Object with feature names as keys and enabled status as values
   */
  getAllEnabledFeatures() {
    const result = {};
    for (const featureName in this.flags) {
      result[featureName] = this.isEnabled(featureName);
    }
    return result;
  }
}

// Singleton instance of the feature flags utility
const featureFlags = new FeatureFlags();

// Example usage:
console.log("Is newDashboard enabled?", featureFlags.isEnabled("newDashboard"));
console.log("Is darkMode enabled?", featureFlags.isEnabled("darkMode"));
console.log("Is chatWidget enabled?", featureFlags.isEnabled("chatWidget"));
console.log(
  "Is advancedAnalytics enabled?",
  featureFlags.isEnabled("advancedAnalytics")
);

console.log("All enabled features:", featureFlags.getAllEnabledFeatures());

// Export the singleton instance for use throughout the app
export default featureFlags;
```

## How to Use This Utility

1. **Check if a feature is enabled**:

```javascript
if (featureFlags.isEnabled("newDashboard")) {
  // Show the new dashboard
} else {
  // Show the old dashboard
}
```

2. **Get all enabled features**:

```javascript
function getFeatureState(featureName, defaultValue) {
  //write your solution here
  return fetchAllFeatures()
    .then((featureFlag) => {
      return featureFlag[featureName] ?? defaultValue;
    })
    .catch(() => defaultValue);
}
//OR
const enabledFeatures = featureFlags.getAllEnabledFeatures();
```

## Key Features of This Implementation

1. **User Segmentation**:

   - Supports user groups (e.g., 'beta-testers', 'premium')
   - Allows excluding specific users
   - Percentage-based rollouts

2. **Consistent Experience**:

   - Uses a hash function to ensure the same user always gets the same feature flags

3. **Simple Integration**:

   - Singleton pattern for easy access throughout the app
   - Simple boolean checks for feature availability

4. **Extensible**:
   - Can easily be modified to pull flag configurations from an API
   - Additional segmentation rules can be added

## Hardcoded Response Example

The utility includes hardcoded responses for these feature flags:

- `newDashboard`: Enabled for 30% of users, plus beta-testers and premium users
- `darkMode`: Enabled for all users
- `chatWidget`: Completely disabled
- `advancedAnalytics`: Enabled for 10% of users plus specific groups

You can easily extend this by adding more feature flags to the `flags` object or modifying the current user's information.
