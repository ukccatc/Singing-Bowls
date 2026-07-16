'use client';

import type { AdminProductSpecFormData } from '@/lib/admin/product-form-schema';
import { ui } from '@/lib/ui';
import { cn } from '@/lib/utils';
import { Plus, Trash2 } from 'lucide-react';

interface ProductSpecificationsFieldProps {
  specifications: AdminProductSpecFormData[];
  onChange: (specifications: AdminProductSpecFormData[]) => void;
}

const emptySpec = (): AdminProductSpecFormData => ({
  name: { en: '', ru: '', uk: '' },
  value: { en: '', ru: '', uk: '' },
  unit: '',
});

const fieldClass = cn(ui.field, ui.focus, 'px-3 py-2 text-sm');

export function ProductSpecificationsField({
  specifications,
  onChange,
}: ProductSpecificationsFieldProps) {
  const updateSpec = (
    index: number,
    patch: Partial<AdminProductSpecFormData> | ((spec: AdminProductSpecFormData) => AdminProductSpecFormData)
  ) => {
    onChange(
      specifications.map((spec, i) => {
        if (i !== index) return spec;
        return typeof patch === 'function' ? patch(spec) : { ...spec, ...patch };
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-charcoal-900">Specifications</h3>
          <p className={`mt-1 text-sm ${ui.page.subtitle}`}>
            Optional named specs shown on the product page (note, frequency, finish, etc.).
          </p>
        </div>
        <button
          type="button"
          onClick={() => onChange([...specifications, emptySpec()])}
          className={cn(ui.button.primary, 'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium')}
        >
          <Plus className="h-4 w-4" />
          Add spec
        </button>
      </div>

      {specifications.length === 0 ? (
        <div className="rounded-lg border border-dashed border-cream-300 bg-cream-50 px-4 py-6 text-center text-sm text-charcoal-600">
          No custom specifications yet.
        </div>
      ) : (
        <div className="space-y-4">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="rounded-xl border border-cream-200 bg-cream-50 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-charcoal-700">Spec #{index + 1}</span>
                <button
                  type="button"
                  onClick={() => onChange(specifications.filter((_, i) => i !== index))}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm text-copper-700 hover:bg-copper-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                {(['en', 'ru', 'uk'] as const).map((lang) => (
                  <div key={`name-${lang}`}>
                    <label className={ui.labelSm}>
                      Name ({lang.toUpperCase()})
                    </label>
                    <input
                      value={spec.name[lang] || ''}
                      onChange={(e) =>
                        updateSpec(index, {
                          name: { ...spec.name, [lang]: e.target.value },
                        })
                      }
                      placeholder={lang === 'en' ? 'e.g. Fundamental note' : ''}
                      className={fieldClass}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                {(['en', 'ru', 'uk'] as const).map((lang) => (
                  <div key={`value-${lang}`}>
                    <label className={ui.labelSm}>
                      Value ({lang.toUpperCase()})
                    </label>
                    <input
                      value={spec.value[lang] || ''}
                      onChange={(e) =>
                        updateSpec(index, {
                          value: { ...spec.value, [lang]: e.target.value },
                        })
                      }
                      placeholder={lang === 'en' ? 'e.g. C#' : ''}
                      className={fieldClass}
                    />
                  </div>
                ))}
                <div>
                  <label className={ui.labelSm}>Unit</label>
                  <input
                    value={spec.unit || ''}
                    onChange={(e) => updateSpec(index, { unit: e.target.value })}
                    placeholder="Hz, cm…"
                    className={fieldClass}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
