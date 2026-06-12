import ReactSelect from 'react-select';
import type { Props as SelectProps, StylesConfig } from 'react-select';

export interface OptionType {
  value: string;
  label: string;
}

export interface CustomSelectProps extends SelectProps<OptionType, boolean> {
  label?: string;
  options: OptionType[];
}

const customStyles: StylesConfig<OptionType, boolean> = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '38px',
    height: 'auto',
    borderRadius: 'var(--radius-md, 6px)',
    border: '1px solid ' + (state.isFocused ? 'var(--color-primary, #0052cc)' : 'var(--color-grey-200, #e2e8f0)'),
    boxShadow: state.isFocused ? '0 0 0 1px var(--color-primary, #0052cc)' : 'none',
    fontSize: '14px',
    backgroundColor: state.isDisabled ? 'var(--color-grey-50, #F9FAFB)' : '#fff',
    opacity: state.isDisabled ? 0.5 : 1,
    cursor: state.isDisabled ? 'not-allowed' : 'default',
    '&:hover': {
      border: '1px solid ' + (state.isFocused ? 'var(--color-primary, #0052cc)' : 'var(--color-grey-300, #cbd5e1)'),
    }
  }),
  valueContainer: (provided) => ({
    ...provided,
    minHeight: '36px',
    height: 'auto',
    padding: '0 8px'
  }),
  input: (provided) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '36px',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--color-text, #1e293b)'
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'var(--color-grey-100, #f1f5f9)',
    borderRadius: '4px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--color-grey-500, #64748b)'
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: 'var(--radius-md, 6px)',
    border: '1px solid var(--color-grey-200, #e2e8f0)',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    zIndex: 9999,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? 'var(--color-primary, #0052cc)' 
      : state.isFocused 
        ? 'var(--color-grey-100, #f1f5f9)' 
        : 'transparent',
    color: state.isSelected ? '#fff' : 'var(--color-text, #1e293b)',
    cursor: 'pointer',
    fontSize: '14px',
    '&:active': {
      backgroundColor: state.isSelected 
        ? 'var(--color-primary, #0052cc)' 
        : 'var(--color-grey-200, #e2e8f0)',
    }
  })
};

export function Select({ label, options, ...props }: CustomSelectProps) {
  return (
    <div className="input-group" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {label && <label style={{ marginBottom: 4, fontSize: 13, fontWeight: 500, color: 'var(--color-text)' }}>{label}</label>}
      <ReactSelect
        styles={customStyles}
        options={options}
        placeholder="Selecione..."
        noOptionsMessage={() => "Nenhuma opção"}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        {...props}
      />
    </div>
  );
}
