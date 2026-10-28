import { useState, useRef } from 'react';
import Input from '../ui/Input';
import PasswordInput from '../ui/PasswordInput';
import Button from '../ui/Button';
import Divider from '../ui/Divider';
import SocialAuthButton from './SocialAuthButton';

export default function LoginForm({ onSwitchToRegister, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  const [errors, setErrors] = useState({});

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validateField = (name, value) => {
    let error = '';

    if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value.trim()) {
        error = 'E-mail wajib diisi';
      } else if (!emailRegex.test(value.trim())) {
        error = 'Format e-mail tidak valid (contoh: nama@domain.com)';
      }
    }

    if (name === 'password') {
      if (!value) {
        error = 'Kata sandi wajib diisi';
      } else if (value.length < 8) {
        error = 'Kata sandi minimal 8 karakter';
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTouched = { email: true, password: true };
    setTouched(newTouched);

    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);

    const newErrors = {
      email: emailError,
      password: passwordError
    };

    setErrors(newErrors);

    if (emailError) {
      document.getElementById('email')?.focus();
      return;
    }

    if (passwordError) {
      document.getElementById('password')?.focus();
      return;
    }

    alert(`Berhasil masuk sebagai ${formData.email}!`);
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="w-full bg-white rounded-xl border border-[#F1F1F1] shadow-[0_2px_12px_rgba(0,0,0,0.03)] px-5 py-6 sm:p-8 md:p-10">
      <div className="text-center mb-6 md:mb-7">
        <h1 className="text-2xl sm:text-[26px] md:text-[28px] font-bold text-[#222325] tracking-tight">
          Masuk ke Akun
        </h1>
        <p className="text-sm text-[#7A7A7A] mt-1.5">
          Yuk, lanjutin belajarmu di videobelajar.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4 md:space-y-5">
        <Input
          id="email"
          label="E-Mail"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email ? errors.email : ''}
          autoComplete="email"
          ref={emailRef}
        />

        <div>
          <PasswordInput
            id="password"
            label="Kata Sandi"
            required
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password ? errors.password : ''}
            autoComplete="current-password"
            ref={passwordRef}
          />

          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => alert('Fitur reset kata sandi akan segera hadir!')}
              className="text-sm font-medium text-[#4A4D54] hover:text-[#3ECF4C] transition-colors cursor-pointer whitespace-nowrap"
            >
              Lupa Password?
            </button>
          </div>
        </div>

        <div className="pt-1 space-y-3">
          <Button type="submit" variant="primary">
            Masuk
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={onSwitchToRegister}
          >
            Daftar
          </Button>
        </div>

        <Divider text="atau" className="my-5" />

        <SocialAuthButton
          text="Masuk dengan Google"
          onClick={() => alert('Autentikasi Google akan diproses.')}
        />
      </form>
    </div>
  );
}
