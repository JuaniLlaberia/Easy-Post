const CustomInput = ({value, id, type, onChange, label, required, readonly, textarea, classInput, classLabel, onBlur}) => {
  return (
    <div className='input-field'>
        {textarea ? <textarea value={value} className={classInput} id={id} required={required} readOnly={readonly} onChange={onChange} onBlur={onBlur}/>
        : <input value={value} className={classInput} required={required} readOnly={readonly} id={id} type={type} onChange={onChange} onBlur={onBlur}/>}
        <label className={classLabel} htmlFor={id}>{label}</label>
    </div>
  )
}

export default CustomInput
