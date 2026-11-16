import { StyleSheet, Text, View } from 'react-native';

export interface SectionHeadingProps {
  title: string;
  subtitle: string;
  align?: 'left' | 'center';
  level?: 'hero' | 'section';
}

export function SectionHeading({
  title,
  subtitle,
  align = 'left',
  level = 'section',
}: SectionHeadingProps) {
  const hero = level === 'hero';

  return (
    <View style={[styles.container, align === 'center' && styles.centered]}>
      <Text
        accessibilityRole="header"
        style={[
          styles.title,
          hero ? styles.heroTitle : styles.sectionTitle,
          align === 'center' && styles.centeredText,
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.subtitle,
          align === 'center' && styles.centeredText,
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  centered: {
    alignItems: 'center',
  },
  title: {
    color: '#111827',
    fontWeight: '700',
  },
  heroTitle: {
    fontSize: 30,
    lineHeight: 38,
  },
  sectionTitle: {
    fontSize: 22,
    lineHeight: 29,
  },
  subtitle: {
    color: '#526070',
    fontSize: 15,
    lineHeight: 22,
  },
  centeredText: {
    textAlign: 'center',
  },
});
