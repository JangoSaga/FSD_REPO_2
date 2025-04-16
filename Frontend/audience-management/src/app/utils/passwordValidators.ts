import { FormGroup } from '@angular/forms';

export const passwordMatchValidator = (form: FormGroup) => {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirm_password')?.value;
  return password === confirmPassword ? null : { passwordMistMatch: true };
};
