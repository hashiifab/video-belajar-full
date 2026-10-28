import { useState } from 'react';
import AccountLayout from './AccountLayout';
import Input from '../ui/Input';
import PasswordInput from '../ui/PasswordInput';
import PhoneInput from '../ui/PhoneInput';
import Select from '../ui/Select';
import { userProfileData } from '../../data/accountData';
import { countryCodes } from '../../data/countryCodes';

export default function ProfilePage({ onNavigate }) {
  const [profile, setProfile] = useState(userProfileData);
  const [password, setPassword] = useState('howyoulikethat');
  const [confirmPassword, setConfirmPassword] = useState('howyoulikethat');
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const genderOptions = [
    { value: 'Perempuan', label: 'Perempuan' },
    { value: 'Laki-laki', label: 'Laki-laki' }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    alert('Data profil berhasil diperbarui!');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <AccountLayout
      activeTab="profil"
      onSelectTab={(tab) => {
        if (tab === 'kelas') onNavigate('kelas');
        if (tab === 'pesanan') onNavigate('pesanan');
      }}
      title="Ubah Profil"
      subtitle="Ubah data diri Anda"
    >
      <div className="bg-white rounded-xl border border-[#F1F1F1] shadow-xs p-5 sm:p-8">
        {/* User Avatar & Info Row */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-gray-200 shrink-0 bg-gray-100">
            <img
              src={profile.avatar}
              alt={profile.fullName}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#222325]">
              {profile.fullName}
            </h2>
            <p className="text-xs text-[#7A7A7A] mt-0.5">
              {profile.email}
            </p>
            <button
              type="button"
              onClick={() => alert('Fitur upload foto profil akan segera hadir!')}
              className="text-xs font-semibold text-[#FF4D00] hover:text-[#D93D00] transition-colors mt-1.5 cursor-pointer"
            >
              Ganti Foto Profil
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSave} className="mt-6 space-y-4 sm:space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <Input
              id="profile-name"
              label="Nama Lengkap"
              required
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
            />

            <Input
              id="profile-email"
              label="E-Mail"
              type="email"
              required
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <Select
              id="profile-gender"
              label="Jenis Kelamin"
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              options={genderOptions}
            />

            <PhoneInput
              id="profile-phone"
              label="No. Hp"
              value={profile.phone}
              onChange={(cleanDigits) => setProfile({ ...profile, phone: cleanDigits })}
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-2 border-t border-gray-100">
            <PasswordInput
              id="profile-password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <PasswordInput
              id="profile-confirm-password"
              label="Konfirmasi Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-[#3ECF4C] hover:bg-[#34BD41] active:bg-[#2DAA38] text-white font-semibold text-sm rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
}
