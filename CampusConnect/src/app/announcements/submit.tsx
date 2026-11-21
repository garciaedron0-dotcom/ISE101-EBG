import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAnnouncementContext } from '@/context/AnnouncementContext';

type FormErrors = {
  title?: string;
  description?: string;
};

export default function AnnouncementSubmitScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState('');
  const { submittedCount, recordSubmission } = useAnnouncementContext();

  useEffect(() => {
    console.log('Announcement form mounted');

    return () => {
      console.log('Announcement form unmounted');
    };
  }, []);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      nextErrors.title = 'Enter an announcement title.';
    }

    if (!trimmedDescription) {
      nextErrors.description = 'Enter a description.';
    } else if (trimmedDescription.length < 10) {
      nextErrors.description = 'Use at least 10 characters.';
    }

    return nextErrors;
  };

  const handleSubmit = () => {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setMessage('Please correct the highlighted fields.');
      return;
    }

    recordSubmission();
    setMessage('Announcement draft submitted successfully.');
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setErrors({});
    setMessage('');
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (errors.title) {
      setErrors((current) => ({ ...current, title: undefined }));
    }
    if (message) {
      setMessage('');
    }
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    if (errors.description) {
      setErrors((current) => ({
        ...current,
        description: undefined,
      }));
    }
    if (message) {
      setMessage('');
    }
  };

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/announcements/index');
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text accessibilityRole="header" style={styles.heading}>
          Announcement Submission
        </Text>
        <Text style={styles.count}>
          Successful Submissions: {submittedCount}
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Announcement Title</Text>
          <TextInput
            value={title}
            onChangeText={handleTitleChange}
            placeholder="e.g., Campus clean-up drive"
            accessibilityLabel="Announcement title"
            style={[
              styles.input,
              errors.title ? styles.inputError : undefined,
            ]}
          />
          {errors.title ? (
            <Text accessibilityRole="alert" style={styles.error}>
              {errors.title}
            </Text>
          ) : null}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Announcement Description</Text>
          <TextInput
            value={description}
            onChangeText={handleDescriptionChange}
            placeholder="Describe the event and who should attend"
            accessibilityLabel="Announcement details"
            multiline
            textAlignVertical="top"
            style={[
              styles.input,
              styles.descriptionInput,
              errors.description ? styles.inputError : undefined,
            ]}
          />
          {errors.description ? (
            <Text accessibilityRole="alert" style={styles.error}>
              {errors.description}
            </Text>
          ) : null}
        </View>

        {message ? (
          <Text
            accessibilityRole="alert"
            style={[
              styles.message,
              message.startsWith('Please')
                ? styles.errorMessage
                : styles.successMessage,
            ]}
          >
            {message}
          </Text>
        ) : null}

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>
              Submit Announcement
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={handleReset}
            style={({ pressed }) => [
              styles.resetButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={goBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },
  content: {
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: '#FFFFFF',
    borderColor: '#DCE3EC',
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
  },
  heading: {
    color: '#17324D',
    fontSize: 24,
    fontWeight: '700',
  },
  count: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 18,
  },
  field: {
    marginBottom: 18,
  },
  label: {
    color: '#34475A',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    minHeight: 48,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    borderWidth: 1,
    color: '#1F2937',
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  descriptionInput: {
    minHeight: 120,
  },
  inputError: {
    borderColor: '#B91C1C',
    borderWidth: 2,
  },
  error: {
    color: '#B91C1C',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  message: {
    borderRadius: 8,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
    marginBottom: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  errorMessage: {
    backgroundColor: '#FEF2F2',
    color: '#B91C1C',
  },
  successMessage: {
    backgroundColor: '#ECFDF5',
    color: '#166534',
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 10,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  resetButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#64748B',
    borderRadius: 10,
    borderWidth: 1,
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  resetButtonText: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '700',
  },
  backButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 18,
  },
  backButtonText: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.78,
  },
});
