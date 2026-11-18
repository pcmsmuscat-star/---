import { render, screen } from '@testing-library/react-native';
import { StatusChip, ValuePill } from '@/components';
import { LanguageProvider } from '@/i18n';

describe('StatusChip', () => {
  it('writes the status out with an arrow', async () => {
    await render(
      <LanguageProvider>
        <StatusChip status="high" />
      </LanguageProvider>,
    );
    expect(await screen.findByText('↑ High')).toBeTruthy();
  });

  it('shows the value in a pill', async () => {
    await render(
      <LanguageProvider>
        <ValuePill value="2.5" />
      </LanguageProvider>,
    );
    expect(await screen.findByText('2.5')).toBeTruthy();
  });
});
