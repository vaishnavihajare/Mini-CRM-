export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePhone = (phone) => {
  const re = /^[\d\s\-\+\(\)]+$/
  return phone.length >= 10 && re.test(phone)
}

export const validateLeadForm = (formData) => {
  const errors = {}

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name is required'
  }

  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Invalid email format'
  }

  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Invalid phone format'
  }

  if (!formData.email && !formData.phone) {
    errors.contact = 'Either email or phone is required'
  }

  if (!formData.source) {
    errors.source = 'Source is required'
  }

  if (!formData.status) {
    errors.status = 'Status is required'
  }

  return errors
}