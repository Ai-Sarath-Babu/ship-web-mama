/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

interface ExitIntentDetectorProps {
  onExitIntent: () => void;
}

export default function ExitIntentDetector({ onExitIntent }: ExitIntentDetectorProps) {
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // If the cursor leaves the top boundary of the window, trigger exit-intent
      if (e.clientY < 15 && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        onExitIntent();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [onExitIntent]);

  return null;
}
