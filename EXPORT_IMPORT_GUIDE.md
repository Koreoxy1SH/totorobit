# Habit Streak App - Export/Import Data Guide

## 🎯 Export/Import Features

The app now includes comprehensive data backup and restore functionality for Android devices.

## 📁 Export Data Functionality

### **What Gets Exported**

- All habit data with complete history
- Streak information (current and longest)
- Completion dates for each habit
- Metadata (export date, version, totals)

### **Export File Format**

```json
{
  "version": "1.0.0",
  "exportDate": "2025-07-13T10:30:00.000Z",
  "habits": [
    {
      "id": "1234567890",
      "name": "Drink Water",
      "createdAt": "2025-07-01",
      "completedDates": ["2025-07-01", "2025-07-02", "2025-07-03"],
      "currentStreak": 3,
      "longestStreak": 5
    }
  ],
  "totalHabits": 1,
  "totalStreak": 3
}
```

### **How to Export**

1. **Navigate to Settings**: Tap the Settings tab
2. **Find Export Option**: Look for "Export Data" with green download icon
3. **Tap Export**: The app will create a JSON backup file
4. **Share File**: Choose where to save/share the file
5. **Success Message**: Confirmation when export completes

### **Export Process**

1. **Data Validation**: Checks if habits exist to export
2. **File Creation**: Generates timestamped JSON file
3. **File Sharing**: Opens Android share dialog
4. **Save Options**: Save to Downloads, Drive, Email, etc.

## 📥 Import Data Functionality

### **Supported File Format**

- **File Type**: JSON files only
- **Structure**: Must match export format
- **Validation**: Automatic data structure validation

### **How to Import**

1. **Navigate to Settings**: Tap the Settings tab
2. **Find Import Option**: Look for "Import Data" with orange upload icon
3. **Tap Import**: Confirmation dialog appears
4. **Select File**: Choose JSON backup file
5. **Confirm Import**: Replace current data or cancel
6. **Success Message**: Confirmation when import completes

### **Import Process**

1. **File Selection**: Document picker opens
2. **File Reading**: Reads and parses JSON content
3. **Data Validation**: Checks file structure and habit data
4. **Data Replacement**: Replaces current habits with imported data
5. **Storage Update**: Saves imported data to local storage

## 🔧 Technical Implementation

### **Dependencies Used**

```json
{
  "expo-file-system": "~16.0.5",
  "expo-sharing": "~12.0.1",
  "expo-document-picker": "~12.0.1"
}
```

### **Key Functions**

#### **Export Function**

```typescript
export const exportHabitsData = async (habits: Habit[]): Promise<void> => {
  // Creates JSON with metadata
  // Writes to app documents directory
  // Shares file via Android share dialog
};
```

#### **Import Function**

```typescript
export const importHabitsData = async (): Promise<Habit[]> => {
  // Opens document picker
  // Reads and parses JSON file
  // Validates data structure
  // Returns validated habits array
};
```

### **Data Validation**

- **File Format**: Must be valid JSON
- **Structure Check**: Requires habits array
- **Habit Validation**: Each habit must have required fields
- **Type Safety**: Ensures proper data types

## 🎨 User Interface

### **Settings Screen Layout**

```
┌─────────────────────────────────────┐
│ Settings                           │
├─────────────────────────────────────┤
│ Data Management                    │
│ 📥 Export Data      >              │ ← Green
│ 📤 Import Data      >              │ ← Orange
│ 🗑️ Clear All Data   >              │ ← Red
├─────────────────────────────────────┤
│ [Habits] [Stats] [Settings]       │
└─────────────────────────────────────┘
```

### **Color Coding**

- **Export**: Green (#4CAF50) - Safe operation
- **Import**: Orange (#FF9800) - Caution operation
- **Clear**: Red (#FF6B6B) - Destructive operation

## 🧪 Testing Export/Import

### **Test Export**

1. **Add Test Habits**: Create 2-3 habits with streaks
2. **Export Data**: Go to Settings → Export Data
3. **Check File**: Verify JSON file is created
4. **Validate Content**: Open file to check data structure

### **Test Import**

1. **Clear Data**: Use "Clear All Data" first
2. **Import File**: Go to Settings → Import Data
3. **Select Backup**: Choose exported JSON file
4. **Verify Import**: Check habits and streaks restored

### **Test Scenarios**

- **Empty Data**: Try exporting with no habits
- **Invalid File**: Try importing non-JSON file
- **Corrupted Data**: Try importing malformed JSON
- **Large Dataset**: Test with many habits and long streaks

## 🚨 Error Handling

### **Export Errors**

- **No Data**: Alert if no habits to export
- **File Write Error**: Handle storage issues
- **Share Error**: Fallback if sharing unavailable

### **Import Errors**

- **File Selection**: Handle cancelled file picker
- **Invalid Format**: Validate JSON structure
- **Data Validation**: Check required fields
- **Storage Error**: Handle save failures

### **User Feedback**

- **Success Messages**: Confirm successful operations
- **Error Messages**: Clear error descriptions
- **Progress Indicators**: Show operation status
- **Confirmation Dialogs**: Confirm destructive actions

## 📱 Android-Specific Features

### **File System Access**

- **Documents Directory**: Uses app's private storage
- **File Permissions**: No special permissions required
- **Cache Directory**: Temporary file storage

### **Share Integration**

- **Native Share Dialog**: Uses Android share sheet
- **Multiple Options**: Save, email, cloud storage
- **File Type**: Proper MIME type for JSON

### **Document Picker**

- **File Selection**: Native Android file picker
- **Type Filtering**: Only shows JSON files
- **Permission Handling**: Automatic permission management

## 🎯 Benefits

✅ **Data Backup**: Never lose your habit progress
✅ **Device Migration**: Move data between devices
✅ **Data Recovery**: Restore from backup files
✅ **Cross-Platform**: JSON format is universal
✅ **User Control**: Full control over data export/import
✅ **Validation**: Ensures data integrity

## 🔒 Security & Privacy

### **Data Protection**

- **Local Storage**: Files stored in app's private directory
- **No Cloud Sync**: User controls where files are saved
- **No Analytics**: Export/import operations are private

### **File Security**

- **Private Directory**: Files not accessible to other apps
- **User Choice**: User decides where to save/load files
- **No Auto-Upload**: No automatic cloud synchronization

The export/import functionality provides complete data portability while maintaining user privacy and control!
