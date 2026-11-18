import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors } from '@/theme/tokens';

type IconProps = { size?: number; color?: string; strokeWidth?: number };

function Base({ size = 22, color = colors.navy, strokeWidth = 1.9, children }: IconProps & { children: React.ReactNode }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      accessible={false}
    >
      {children}
    </Svg>
  );
}

export const TodayIcon = (p: IconProps) => (
  <Base {...p}>
    <Rect x={3.5} y={5} width={17} height={15} rx={3} />
    <Path d="M3.5 10h17M8 3v4M16 3v4" />
  </Base>
);
export const InrIcon = (p: IconProps) => (
  <Base {...p}>
    <Path d="M3 17l5-5 4 3 8-8" />
    <Path d="M15 7h5v5" />
  </Base>
);
export const SymptomsIcon = (p: IconProps) => (
  <Base {...p}>
    <Path d="M9 4h6v3H9z" />
    <Rect x={5} y={5.5} width={14} height={15.5} rx={2.5} />
    <Path d="M9 13h6M9 17h4" />
  </Base>
);
export const GuideIcon = (p: IconProps) => (
  <Base {...p}>
    <Path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
    <Path d="M4 21V5" />
  </Base>
);
export const MoreIcon = (p: IconProps) => (
  <Base {...p}>
    <Rect x={4} y={4} width={6.5} height={6.5} rx={1.5} />
    <Rect x={13.5} y={4} width={6.5} height={6.5} rx={1.5} />
    <Rect x={4} y={13.5} width={6.5} height={6.5} rx={1.5} />
    <Rect x={13.5} y={13.5} width={6.5} height={6.5} rx={1.5} />
  </Base>
);
export const BellIcon = (p: IconProps) => (
  <Base {...p}>
    <Path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8" />
    <Path d="M10 20a2 2 0 0 0 4 0" />
  </Base>
);
/** Points "forward" in the reading direction; pass flip in RTL. */
export const ChevronIcon = ({ flip, ...p }: IconProps & { flip?: boolean }) => (
  <Base {...p}>
    <Path d={flip ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
  </Base>
);
export const PlusIcon = (p: IconProps) => (
  <Base {...p}>
    <Path d="M12 5v14M5 12h14" />
  </Base>
);
export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <Path d="M5 12.5l4.5 4.5L19 7.5" />
  </Base>
);
export const ClockIcon = (p: IconProps) => (
  <Base {...p}>
    <Circle cx={12} cy={12} r={9} />
    <Path d="M12 7v5l3 2" />
  </Base>
);
export const PhoneIcon = (p: IconProps) => (
  <Base {...p}>
    <Path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </Base>
);
export const AlertIcon = (p: IconProps) => (
  <Base {...p}>
    <Path d="M12 3l9 16H3z" />
    <Path d="M12 10v4M12 17v.5" />
  </Base>
);
export const LockIcon = (p: IconProps) => (
  <Base {...p}>
    <Rect x={5} y={10} width={14} height={10} rx={2.5} />
    <Path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </Base>
);
export const GlobeIcon = (p: IconProps) => (
  <Base {...p}>
    <Circle cx={12} cy={12} r={9} />
    <Path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
  </Base>
);
export const OfflineIcon = (p: IconProps) => (
  <Base {...p}>
    <Path d="M3 3l18 18M8.5 8.8A9 9 0 0 0 4 11M12 7a11 11 0 0 1 8 4M7.5 14.5a6 6 0 0 1 4.5-1.5M12 19h.01" />
  </Base>
);
