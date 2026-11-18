import { Text as RNText, type TextProps, type TextStyle, StyleSheet } from 'react-native';
import { useLanguage } from '@/i18n';
import { colors } from '@/theme/tokens';
import { ARABIC_LINE_HEIGHT_FACTOR, fontFamily, type Weight } from '@/theme/fonts';

type Variant = 'title' | 'hero' | 'heading' | 'section' | 'body' | 'bodyStrong' | 'meta' | 'label' | 'button';

const variants: Record<Variant, { size: number; lineHeight: number; weight: Weight; color: string }> = {
  title: { size: 30, lineHeight: 38, weight: 'medium', color: colors.steel },
  hero: { size: 44, lineHeight: 50, weight: 'extrabold', color: colors.navy },
  heading: { size: 22, lineHeight: 30, weight: 'bold', color: colors.navy },
  section: { size: 17, lineHeight: 24, weight: 'bold', color: colors.navy },
  body: { size: 16, lineHeight: 24, weight: 'regular', color: colors.navy },
  bodyStrong: { size: 16, lineHeight: 24, weight: 'bold', color: colors.navy },
  meta: { size: 14, lineHeight: 20, weight: 'medium', color: colors.muted },
  label: { size: 13, lineHeight: 18, weight: 'bold', color: colors.navy },
  button: { size: 17, lineHeight: 22, weight: 'bold', color: colors.white },
};

export type AppTextProps = TextProps & {
  variant?: Variant;
  weight?: Weight;
  color?: string;
  align?: 'start' | 'center' | 'end';
  /** Force Latin font and LTR, for numbers, INR values, phone numbers and IDs. */
  ltr?: boolean;
};

/**
 * All app text goes through this component: it picks the Latin or Arabic font,
 * adds Arabic line height, and aligns to the reading direction.
 */
export function AppText({ variant = 'body', weight, color, align = 'start', ltr, style, ...rest }: AppTextProps) {
  const { isRTL } = useLanguage();
  const v = variants[variant];
  const arabic = isRTL && !ltr;
  const textAlign: TextStyle['textAlign'] =
    align === 'center' ? 'center' : (align === 'start') !== isRTL ? 'left' : 'right';
  return (
    <RNText
      maxFontSizeMultiplier={1.6}
      {...rest}
      style={[
        {
          fontFamily: fontFamily(arabic ? 'arabic' : 'latin', weight ?? v.weight),
          fontSize: v.size,
          lineHeight: Math.round(v.lineHeight * (arabic ? ARABIC_LINE_HEIGHT_FACTOR : 1)),
          color: color ?? v.color,
          textAlign,
          writingDirection: ltr ? 'ltr' : isRTL ? 'rtl' : 'ltr',
        },
        style,
      ]}
    />
  );
}

/** A number or medical value that must never be mirrored (e.g. "2.5", "6 mg"). */
export function Num(props: Omit<AppTextProps, 'ltr'>) {
  return <AppText {...props} ltr style={[styles.num, props.style]} />;
}

const styles = StyleSheet.create({
  num: { fontVariant: ['tabular-nums'] },
});
