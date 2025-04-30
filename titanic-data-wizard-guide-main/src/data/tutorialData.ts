
export interface TutorialStep {
  id: number;
  title: string;
  description: string;
  content: {
    introduction: string;
    details: string[];
    code?: string;
    explanation?: string;
    image?: string; // URL to any image if needed
  };
}

export const tutorialSteps: TutorialStep[] = [
  // Step 1: Introduction
  {
    id: 1,
    title: "Introduction to the Titanic Dataset",
    description: "Understanding the dataset and the machine learning task",
    content: {
      introduction: "The Titanic dataset is one of the most famous datasets in machine learning. It contains information about passengers aboard the RMS Titanic, which sank after colliding with an iceberg in April 1912.",
      details: [
        "The goal is to predict which passengers survived the tragedy based on various features like age, gender, ticket class, etc.",
        "This tutorial will guide you through the process of cleaning and preparing this dataset for machine learning models.",
        "We'll focus specifically on handling missing values, feature engineering, and transforming categorical variables.",
        "By the end of this guide, you'll have a clean dataset ready for model building and prediction."
      ]
    }
  },
  
  // Step 2: Loading the Data
  {
    id: 2,
    title: "Loading the Titanic Dataset",
    description: "Importing the training and testing data",
    content: {
      introduction: "First, we need to load the Titanic dataset into our workspace using pandas. The dataset is typically split into training and testing sets.",
      details: [
        "We'll load both datasets to ensure our data cleaning and feature engineering is consistent across both.",
        "It's important to apply the same transformations to both datasets to avoid data leakage and ensure model generalization."
      ],
      code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
%matplotlib inline

# Load the training data
train_data = pd.read_csv('train.csv')

# Load the test data
test_data = pd.read_csv('test.csv')

# Display the first few rows of the training data
train_data.head()`,
      explanation: "This code loads both the training and testing datasets from CSV files using pandas. We also import other common libraries like numpy for numerical operations, and matplotlib and seaborn for visualizations."
    }
  },
  
  // Step 3: Initial Data Exploration
  {
    id: 3,
    title: "Initial Data Exploration",
    description: "Understanding our dataset's structure and contents",
    content: {
      introduction: "Before diving into data cleaning, it's essential to explore and understand the dataset. This helps us identify missing values, data types, and potential issues.",
      details: [
        "We'll use several pandas methods to examine our data",
        "This exploration will guide our cleaning and feature engineering strategy"
      ],
      code: `# Display basic information about the dataset
train_data.info()

# Get statistical summary of numerical features
train_data.describe()

# Check for missing values
train_data.isnull().sum()

# Visualize missing values
plt.figure(figsize=(10, 6))
sns.heatmap(train_data.isnull(), cbar=False, cmap='viridis')
plt.title('Missing Values in Titanic Dataset')
plt.show()`,
      explanation: "These commands help us understand the dataset structure. `.info()` shows column types and non-null counts, `.describe()` provides statistical summaries, and we use a heatmap to visualize missing values."
    }
  },
  
  // Step 4: Handling Missing Values
  {
    id: 4,
    title: "Handling Missing Values",
    description: "Strategies for dealing with incomplete data",
    content: {
      introduction: "Missing data is a common issue in real-world datasets. The Titanic dataset has missing values in several columns, including Age, Cabin, and Embarked.",
      details: [
        "For each column with missing values, we'll develop an appropriate strategy",
        "The approach depends on the nature of the feature and the amount of missing data"
      ],
      code: `# Handle missing Age values using median based on Pclass and Sex
# First, create a function to fill age
def fill_age(row):
    condition = (
        (train_data['Pclass'] == row['Pclass']) & 
        (train_data['Sex'] == row['Sex'])
    )
    return train_data[condition]['Age'].median()

# Apply the function to fill missing ages
train_data['Age'] = train_data.apply(
    lambda row: fill_age(row) if np.isnan(row['Age']) else row['Age'],
    axis=1
)

# Fill missing Embarked values with the mode (most common value)
most_common_embark = train_data['Embarked'].mode()[0]
train_data['Embarked'] = train_data['Embarked'].fillna(most_common_embark)

# For Cabin, most values are missing, so we'll create a new feature
train_data['CabinKnown'] = train_data['Cabin'].notna().astype(int)

# Check if missing values are handled
train_data.isnull().sum()`,
      explanation: "For Age, we use a more sophisticated approach by imputing the median age based on passenger class and sex. For Embarked, we use the most common value since there are only a few missing values. For Cabin, we create a binary feature indicating whether the cabin information is known, as most values are missing."
    }
  },
  
  // Step 5: Feature Engineering
  {
    id: 5,
    title: "Feature Engineering",
    description: "Creating new features from existing data",
    content: {
      introduction: "Feature engineering is the process of creating new features from existing data to improve model performance. Let's create several new features from the Titanic dataset.",
      details: [
        "We'll extract information from existing columns to create more informative features",
        "These new features may help capture patterns that contribute to survival prediction"
      ],
      code: `# Create a family size feature
train_data['FamilySize'] = train_data['SibSp'] + train_data['Parch'] + 1  # +1 for the passenger themselves

# Create an IsAlone feature
train_data['IsAlone'] = (train_data['FamilySize'] == 1).astype(int)

# Extract titles from names
train_data['Title'] = train_data['Name'].str.extract(' ([A-Za-z]+)\\.')

# Group rare titles
rare_titles = ['Lady', 'Countess', 'Capt', 'Col', 'Don', 'Dr', 'Major', 'Rev', 'Sir', 'Jonkheer', 'Dona']
train_data['Title'] = train_data['Title'].replace(rare_titles, 'Rare')

# Create age groups
train_data['AgeGroup'] = pd.cut(
    train_data['Age'],
    bins=[0, 12, 18, 35, 60, 100],
    labels=['Child', 'Teenager', 'Young Adult', 'Adult', 'Senior']
)

# Create fare groups using quartiles
train_data['FareGroup'] = pd.qcut(
    train_data['Fare'],
    q=4,
    labels=['Low', 'Medium-Low', 'Medium-High', 'High']
)

# Display the new features
train_data[['FamilySize', 'IsAlone', 'Title', 'AgeGroup', 'FareGroup']].head()`,
      explanation: "We've created several new features: FamilySize combines siblings/spouses and parents/children, IsAlone identifies solo travelers, Title extracts honorifics from names, AgeGroup categorizes ages, and FareGroup bins fare prices into quartiles. These features may capture important patterns in the data."
    }
  },
  
  // Step 6: Converting Categorical Features
  {
    id: 6,
    title: "Converting Categorical Features",
    description: "Transforming categorical data for machine learning algorithms",
    content: {
      introduction: "Most machine learning algorithms require numerical input. We need to convert categorical features into a numerical format.",
      details: [
        "We'll use techniques like one-hot encoding for nominal categorical variables",
        "This step is crucial for preparing the data for most ML models"
      ],
      code: `# Convert Sex to numerical (0 for male, 1 for female)
train_data['Sex'] = train_data['Sex'].map({'male': 0, 'female': 1})

# One-hot encode categorical variables
categorical_features = ['Embarked', 'Title', 'AgeGroup', 'FareGroup']
train_data_encoded = pd.get_dummies(
    train_data,
    columns=categorical_features,
    drop_first=True  # Drop one category to avoid multicollinearity
)

# Display the first few rows of the encoded data
train_data_encoded.head()`,
      explanation: "We convert the Sex column to binary values and use one-hot encoding for other categorical features. By setting drop_first=True, we avoid the dummy variable trap (multicollinearity issue) by removing one category from each feature."
    }
  },
  
  // Step 7: Final Data Preparation
  {
    id: 7,
    title: "Final Data Preparation",
    description: "Preparing the final dataset for machine learning",
    content: {
      introduction: "Before we can feed our data into machine learning models, we need to perform a few final preparation steps.",
      details: [
        "We'll drop unnecessary columns that won't contribute to predictions",
        "We'll ensure all data is properly formatted and free of missing values"
      ],
      code: `# Drop columns that we don't need for modeling
columns_to_drop = ['Name', 'Ticket', 'Cabin', 'PassengerId']
final_train_data = train_data_encoded.drop(columns=columns_to_drop)

# Check for any remaining missing values
final_train_data.isnull().sum()

# Final look at our prepared dataset
print(f"Final dataset shape: {final_train_data.shape}")
final_train_data.head()`,
      explanation: "In this final step, we remove columns that aren't needed for modeling, like names and ticket numbers. We then verify that there are no remaining missing values in our dataset. The resulting dataframe is now ready for machine learning algorithms."
    }
  },
  
  // Step 8: Conclusion
  {
    id: 8,
    title: "Conclusion",
    description: "Key takeaways and next steps",
    content: {
      introduction: "Congratulations! You've successfully cleaned the Titanic dataset and engineered useful features for machine learning.",
      details: [
        "We've covered loading and exploring the dataset",
        "We handled missing values in Age, Embarked, and Cabin columns",
        "We created new features like FamilySize, IsAlone, and Title",
        "We converted categorical variables to numerical format using one-hot encoding",
        "The data is now ready for machine learning model training"
      ],
      explanation: "The next steps would be to split your data into training and validation sets, train various machine learning models, tune their hyperparameters, and evaluate their performance. You can now confidently apply these data cleaning and feature engineering techniques to other datasets as well."
    }
  }
];
