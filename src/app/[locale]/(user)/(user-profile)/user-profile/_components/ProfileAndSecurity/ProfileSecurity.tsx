"use client";

import React, { useEffect, useState } from "react";
import "./ProfileSecurity.scss";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useAuth } from "@/types/auth";
import axios from "@/lib/axios";
import { useDispatch, useSelector } from 'react-redux';
import { setIsUpcomingPage, setUserName, selectUpcomingPageState } from '@/slices/upcomingPageSlice';

export default function ProfileSecurity() {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const [isEditable, setIsEditable] = useState({
    fullName: false,
    email: false,
    phoneNumber: false,
    password: false,
  });
  const t = useTranslations();


  const handleEdit = (field: string) => {
    setIsEditable((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleSave = async (field: string) => {
    try {
      // Обновление через PUT-запрос
      await axios.put(`/api/profile/password${field}`, {
        [field]: field === "password" ? password : eval(field), // В зависимости от поля, отправляем соответствующее значение
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // После успешного сохранения обновляем значение
      setIsEditable((prev) => ({
        ...prev,
        [field]: false,
      }));
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  const handleSaveName = async () => {
    try {

      const response = await axios.put(
        '/api/profile/name',
        {
          name: fullName,

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      if (response.data.success) {

        setUserName(fullName)

        setIsEditable((prev) => ({
          ...prev,
          fullName: false,
        }));
      }
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  const handleSaveEmail = async () => {
    try {

      const response = await axios.put(
        '/api/profile/email',
        {
          email: email,

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      if (response.data.success) {

        setIsEditable((prev) => ({
          ...prev,
          email: false,
        }));
      }
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  const handleSavePassword = async () => {
    try {

      const response = await axios.put(
        '/api/profile/password',
        {
          current_password: currentPassword,
          password: password,
          password_confirmation: passwordConfirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      if (response.data.success) {
        setPassword('');
        setCurrentPassword('');
        setPasswordConfirmation('');


        setIsEditable((prev) => ({
          ...prev,
          password: false,
        }));
      }
    } catch (err) {
      setError(err.response?.data || err.message);
    }
  };

  const handleCancel = (field: string) => {
    setIsEditable((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/profile/user/info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        console.log(response.data);


        setFullName(userData.data.name);
        setEmail(userData.data.email);
        setPhoneNumber(userData.data.phone);
        setPassword("");
      } catch (err) {
        setError(err.response?.data || err.message);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="profileSecurity">
      <div className="title flex items-center gap-[10px]" onClick={() => dispatch(setIsUpcomingPage(false))}>
        <div className='lg:hidden'>
          <Image src={"/images/icons/left-children.svg"} width={20} height={20} alt='' />
        </div>
        <h2 className="max-lg:!mb-0 max-lg:!text-xl">{t("profileAndSecurity")}</h2>
      </div>

      <div className="profileCard">
        {/* Full Name */}
        <div className="profileItem">
          <div className="info flex-1">
            {isEditable.fullName ? (
              <div className="w-full">
                <div className="relative w-full">
                  <p className="label absolute left-[18px] top-1">Full Name</p>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-field w-full h-[49px] px-3 pt-3 rounded-xl !border !border-[#5CB170] outline-none"
                  />
                </div>
                <div className="edit-actions flex gap-[20px] justify-end mt-[20px] text-sm">
                  <button onClick={() => handleSaveName()} className="save-button flex items-center gap-1">
                    <Image src={"/images/icons/check-circle.svg"} alt="" width={18} height={18} />
                    Save
                  </button>
                  <button onClick={() => handleCancel("fullName")} className="cancel-button flex items-center gap-1">
                    <Image src={"/images/icons/x-circle.svg"} alt="" width={18} height={18} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="value">{fullName}</p>
                <p className="label">Full Name</p>
              </div>
            )}
          </div>
          <div className="actions">
            {!isEditable.fullName && (
              <button className="editButton" onClick={() => handleEdit("fullName")}>
                <span className="edit-icon w-[18px] h-[18px]">
                  <Image src={"/images/icons/pencil-icon.svg"} alt="" width={18} height={18} />
                </span>
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="profileItem">
          <div className="info flex-1">
            {isEditable.email ? (
              <div className="w-full">
                <div className="relative w-full">
                  <p className="label absolute left-[18px] top-1">Email</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field w-full h-[49px] px-3 pt-3 rounded-xl !border !border-[#5CB170] outline-none"
                  />
                </div>

                <div className="edit-actions flex gap-[20px] justify-end mt-[20px] text-sm">
                  <button onClick={() => handleSaveEmail()} className="save-button flex items-center gap-1">
                    <Image src={"/images/icons/check-circle.svg"} alt="" width={18} height={18} />
                    Save
                  </button>
                  <button onClick={() => handleCancel("email")} className="cancel-button flex items-center gap-1">
                    <Image src={"/images/icons/x-circle.svg"} alt="" width={18} height={18} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="value">{email}</p>
                <p className="label">Email</p>
              </div>
            )}
          </div>
          <div className="actions">
            {!isEditable.email && (
              <button className="editButton" onClick={() => handleEdit("email")}>
                <span className="edit-icon w-[18px] h-[18px]">
                  <Image src={"/images/icons/pencil-icon.svg"} alt="" width={18} height={18} />
                </span>
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div className="profileItem">
          <div className="info flex-1">
            {isEditable.phoneNumber ? (
              <div className="w-full">
                <div className="relative w-full">
                  <p className="label absolute left-[18px] top-1">Phone Number</p>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="input-field w-full h-[49px] px-3 pt-3 rounded-xl !border !border-[#5CB170] outline-none"
                  />
                </div>

                <div className="edit-actions flex gap-[20px] justify-end mt-[20px] text-sm">
                  <button onClick={() => handleSave("phoneNumber")} className="save-button flex items-center gap-1">
                    <Image src={"/images/icons/check-circle.svg"} alt="" width={18} height={18} />
                    Save
                  </button>
                  <button onClick={() => handleCancel("phoneNumber")} className="cancel-button flex items-center gap-1">
                    <Image src={"/images/icons/x-circle.svg"} alt="" width={18} height={18} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="value">{phoneNumber}</p>
                <p className="label">Phone Number</p>
              </div>
            )}
          </div>
          <div className="actions">
            {!isEditable.phoneNumber && (
              <button className="editButton" onClick={() => handleEdit("phoneNumber")}>
                <span className="edit-icon w-[18px] h-[18px]">
                  <Image src={"/images/icons/pencil-icon.svg"} alt="" width={18} height={18} />
                </span>
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="profileItem">
          <div className="info flex-1">
            {isEditable.password ? (
              <div className="w-full">
                <div className="relative w-full">
                  <p className="label absolute left-[18px] top-1">Current Password</p>
                  <input
                    type="text"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="input-field w-full h-[49px] px-3 pt-3 rounded-xl !border !border-[#5CB170] outline-none"
                  />
                </div>
                <div className="relative w-full mt-2">
                  <p className="label absolute left-[18px] top-1">Password</p>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field w-full h-[49px] px-3 pt-3 rounded-xl !border !border-[#5CB170] outline-none"
                  />
                </div>
                <div className="relative w-full mt-2">
                  <p className="label absolute left-[18px] top-1">Password Confirmation</p>
                  <input
                    type="text"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    className="input-field w-full h-[49px] px-3 pt-3 rounded-xl !border !border-[#5CB170] outline-none"
                  />
                </div>

                <div className="edit-actions flex gap-[20px] justify-end mt-[20px] text-sm">
                  <button onClick={() => handleSavePassword()} className="save-button flex items-center gap-1">
                    <Image src={"/images/icons/check-circle.svg"} alt="" width={18} height={18} />
                    Save
                  </button>
                  <button onClick={() => handleCancel("password")} className="cancel-button flex items-center gap-1">
                    <Image src={"/images/icons/x-circle.svg"} alt="" width={18} height={18} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="value">••••••••••</p>
                <p className="label">Password</p>
              </div>
            )}
          </div>
          <div className="actions">
            {!isEditable.password && (
              <button className="editButton" onClick={() => handleEdit("password")}>
                <span className="edit-icon w-[18px] h-[18px]">
                  <Image src={"/images/icons/pencil-icon.svg"} alt="" width={18} height={18} />
                </span>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
