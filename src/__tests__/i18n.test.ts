import en from '@/i18n/en';
import ar from '@/i18n/ar';

function flatten(obj: object, prefix = ''): Record<string, string> {
  return Object.entries(obj).reduce<Record<string, string>>((acc, [k, v]) => {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object') Object.assign(acc, flatten(v as object, key));
    else acc[key] = String(v);
    return acc;
  }, {});
}

describe('translations', () => {
  const enKeys = flatten(en);
  const arKeys = flatten(ar);

  it('has every English string in Arabic and vice versa', () => {
    expect(Object.keys(arKeys).sort()).toEqual(Object.keys(enKeys).sort());
  });

  it('has no empty strings', () => {
    for (const [key, value] of [...Object.entries(enKeys), ...Object.entries(arKeys)]) {
      expect({ key, empty: value.trim() === '' }).toEqual({ key, empty: false });
    }
  });

  it('keeps interpolation placeholders in both languages', () => {
    for (const [key, value] of Object.entries(enKeys)) {
      const placeholders = value.match(/{{\w+}}/g) ?? [];
      for (const p of placeholders) expect({ key, has: arKeys[key].includes(p) }).toEqual({ key, has: true });
    }
  });

  it('writes status with arrows so colour is never the only signal', () => {
    expect(en.status.high).toContain('↑');
    expect(en.status.low).toContain('↓');
    expect(ar.status.high).toContain('↑');
    expect(ar.status.low).toContain('↓');
  });
});
