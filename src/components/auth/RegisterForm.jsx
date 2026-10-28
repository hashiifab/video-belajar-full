import { useState } from 'react';
import Input from '../ui/Input';
import PasswordInput from '../ui/PasswordInput';
import PhoneInput from '../ui/PhoneInput';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Divider from '../ui/Divider';
import SocialAuthButton from './SocialAuthButton';
import { countryCodes } from '../../data/countryCodes';

export default function RegisterForm({ onSwitchToLogin, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: 'Wanita',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    gender: false,
    phone: false,
    password: false,
    confirmPassword: false
  });

  const [errors, setErrors] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);

  const genderOptions = [
    { value: 'Wanita', label: 'Wanita' },
    { value: 'Pria', label: 'Pria' }
  ];

  const validateField = (name, value, currentFormData = formData) => {
    let error = '';

    if (name === 'fullName') {
      if (!value.trim()) {
        error = 'Nama lengkap wajib diisi';
      } else if (value.trim().length < 3) {
        error = 'Nama lengkap minimal 3 karakter';
      } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
        error = 'Nama hanya boleh berupa huruf dan spasi';
      }
    }

    if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!value.trim()) {
        error = 'E-mail wajib diisi';
      } else if (!emailRegex.test(value.trim())) {
        error = 'Format e-mail tidak valid (contoh: nama@domain.com)';
      }
    }

    if (name === 'phone') {
      if (!value.trim()) {
        error = 'Nomor HP wajib diisi';
      } else if (value.length < 9) {
        error = 'Nomor HP minimal 9 digit angka';
      } else if (value.length > 13) {
        error = 'Nomor HP maksimal 13 digit angka';
      }
    }

    if (name === 'password') {
      if (!value) {
        error = 'Kata sandi wajib diisi';
      } else if (value.length < 8) {
        error = 'Kata sandi minimal 8 karakter';
      } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(value)) {
        error = 'Kata sandi harus mengandung kombinasi huruf dan angka';
      }
    }

    if (name === 'confirmPassword') {
      if (!value) {
        error = 'Konfirmasi kata sandi wajib diisi';
      } else if (value !== currentFormData.password) {
        error = 'Konfirmasi kata sandi tidak cocok dengan kata sandi';
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    if (touched[name]) {
      const fieldError = validateField(name, value, updatedForm);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }

    if (name === 'password' && touched.confirmPassword) {
      const confirmError = validateField(
        'confirmPassword',
        formData.confirmPassword,
        updatedForm
      );
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handlePhoneChange = (cleanDigits) => {
    const updatedForm = { ...formData, phone: cleanDigits };
    setFormData(updatedForm);

    if (touched.phone) {
      const fieldError = validateField('phone', cleanDigits, updatedForm);
      setErrors((prev) => ({ ...prev, phone: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    const fieldError = validateField('phone', formData.phone);
    setErrors((prev) => ({ ...prev, phone: fieldError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allTouched = {
      fullName: true,
      email: true,
      gender: true,
      phone: true,
      password: true,
      confirmPassword: true
    };
    setTouched(allTouched);

    const newErrors = {
      fullName: validateField('fullName', formData.fullName),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      password: validateField('password', formData.password),
      confirmPassword: validateField(
        'confirmPassword',
        formData.confirmPassword,
        formData
      )
    };

    setErrors(newErrors);

    const firstErrorKey = Object.keys(newErrors).find((key) => newErrors[key]);
    if (firstErrorKey) {
      document.getElementById(firstErrorKey)?.focus();
      return;
    }

    alert(
      `Pendaftaran berhasil! Akun untuk ${formData.fullName} (${formData.email}) telah dibuat.`
    );
    if (onRegisterSuccess) onRegisterSuccess();
  };


  return (
    <div className="w-full bg-white rounded-xl border border-[#F1F1F1] shadow-[0_2px_12px_rgba(0,0,0,0.03)] px-5 py-6 sm:p-8 md:p-10">
      <div className="text-center mb-6 md:mb-7">
        <h1 className="text-2xl sm:text-[26px] md:text-[28px] font-bold text-[#222325] tracking-tight">
          Pendaftaran Akun
        </h1>
        <p className="text-sm text-[#7A7A7A] mt-1.5">
          Yuk, daftarkan akunmu sekarang juga!
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4 md:space-y-4.5">
        <Input
          id="fullName"
          label="Nama Lengkap"
          type="text"
          required
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.fullName ? errors.fullName : ''}
          autoComplete="name"
        />

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
        />

        <Select
          id="gender"
          label="Jenis Kelamin"
          required
          value={formData.gender}
          onChange={handleChange}
          options={genderOptions}
          placeholder=""
        />

        <PhoneInput
          id="phone"
          label="No. Hp"
          required
          value={formData.phone}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          error={touched.phone ? errors.phone : ''}
          placeholder=""
        />

        <PasswordInput
          id="password"
          label="Kata Sandi"
          required
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password ? errors.password : ''}
          autoComplete="new-password"
        />

        <div>
          <PasswordInput
            id="confirmPassword"
            label="Konfirmasi Kata Sandi"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword ? errors.confirmPassword : ''}
            autoComplete="new-password"
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
            Daftar
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={onSwitchToLogin}
          >
            Masuk
          </Button>
        </div>

        <Divider text="atau" className="my-5" />

        <SocialAuthButton
          text="Daftar dengan Google"
          onClick={() => alert('Pendaftaran Google akan diproses.')}
        />
      </form>
    </div>
  );
}
