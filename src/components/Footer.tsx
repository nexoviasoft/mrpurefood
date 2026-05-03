"use client";

import PaymentGateway from "../../public/images/payment-gateway.webp";
import { useAuth } from "../context/AuthContext";
import { API_CONFIG } from "../lib/api-config";
import { getCategories, getSystemUserByCompanyId } from "../lib/api-services";
import { Category } from "../types/category";
import { SystemUser } from "../types/system-user";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaFacebookF } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  const { userSession } = useAuth();
  const [companyInfo, setCompanyInfo] = useState<SystemUser | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCompanyLoading, setIsCompanyLoading] = useState(true);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
  // const [imageLoaded, setImageLoaded] = useState(false);

  const companyId = useMemo(
    () => userSession?.companyId || API_CONFIG.companyId,
    [userSession?.companyId],
  );

  useEffect(() => {
    let mounted = true;
    const loadCompanyInfo = async () => {
      if (!companyId) {
        if (mounted) setIsCompanyLoading(false);
        return;
      }

      if (mounted) {
        setIsCompanyLoading(true);
        setCompanyInfo(null);
      }

      try {
        const data = await getSystemUserByCompanyId(companyId);
        if (mounted) {
          setCompanyInfo(data ?? null);
        }
      } finally {
        if (mounted) setIsCompanyLoading(false);
      }
    };
    loadCompanyInfo();
    return () => {
      mounted = false;
    };
  }, [companyId]);

  useEffect(() => {
    let mounted = true;
    const loadCategories = async () => {
      if (!companyId) {
        if (mounted) setIsCategoriesLoading(false);
        return;
      }

      if (mounted) {
        setIsCategoriesLoading(true);
        setCategories([]);
      }

      try {
        const data = await getCategories(companyId);
        if (mounted && Array.isArray(data) && data.length) {
          setCategories(data);
        }
      } finally {
        if (mounted) setIsCategoriesLoading(false);
      }
    };
    loadCategories();
    return () => {
      mounted = false;
    };
  }, [companyId]);

  const companyName = companyInfo?.companyName || "";
  const branchLocation = companyInfo?.branchLocation || "।";
  const phone = companyInfo?.phone || "";
  const email = companyInfo?.email || "";
  // const logoSrc = companyInfo?.companyLogo;
  const fallbackCategories = [
    { name: "ওয়ালবোর্ড", slug: "wallboard" },
    { name: "ক্যানভাস প্রিন্ট", slug: "canvas-print" },
    { name: "দোয়া কার্ড", slug: "dua-card" },
    { name: "দাওয়া ক্যানভাস", slug: "dawah-canvas" },
    { name: "ওয়াল হ্যাঙ্গিং", slug: "wall-hanging" },
    { name: "ইভেন্ট বোর্ড", slug: "event-board" },
    { name: "প্রচারমূলক জিনিসপত্র", slug: "promo-items" },
    { name: "উপহার সামগ্রী", slug: "gift-items" },
    { name: "আনুষাঙ্গিক", slug: "accessories" },
    { name: "কাস্টম পণ্য", slug: "custom-products" },
  ];
  const isLoading = isCompanyLoading || isCategoriesLoading;
  const visibleCategories = categories.length ? categories : fallbackCategories;

  if (isLoading) {
    return (
      <footer className=" bg-primary">
        <div className=" max-w-7xl mx-auto py-16 px-5 flex items-center justify-center">
          <div
            className="w-7 h-7 border-2 border-white/20 border-t-white rounded-full animate-spin"
            role="status"
            aria-label="Loading"
          />
        </div>
      </footer>
    );
  }

  return (
    <footer className=" bg-primary mt-10">
      <div className=" max-w-7xl mx-auto py-16 px-5 flex min-[910px]:flex-row flex-col gap-5 text-white">
        <div className=" flex flex-col gap-3 min-[910px]:flex-[0_0_30%] ">
          {/* <Link href="/">
            <div className="relative min-w-[80px] min-h-[60px] flex items-center justify-center">
              {(!companyInfo || (logoSrc && !imageLoaded)) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-gray-500/30 border-t-white rounded-full animate-spin" />
                </div>
              )}
              {logoSrc && (
                <Image
                  src={logoSrc}
                  alt="logo"
                  width={80}
                  height={60}
                  unoptimized
                  className={`transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setImageLoaded(true)}
                />
              )}
            </div>
          </Link> */}

          <p className=" text-white/90">
            <strong>{companyName}</strong>– আপনার লাইফস্টাইলের জন্য নির্ভরযোগ্য
            ইকমার্স। আমরা সরবরাহ করি মানসম্পন্ন লাইফস্টাইল পণ্য, দ্রুত ডেলিভারি
            এবং সন্তুষ্টি নিশ্চিত সেবা।
          </p>
          <p className=" text-white/90">{branchLocation}</p>
          <p className=" text-white/90">{phone}</p>
          <div className=" flex gap-2 text-white">
            <Link
              href={`mailto:${email}`}
              className=" border border-white/30 rounded-full p-2 text-lg hover:border-white hover:bg-white/10 transition-all duration-200 ease-linear cursor-pointer"
            >
              <MdOutlineEmail />
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=100064515172094"
              target="_blank"
              rel="noopener noreferrer"
              className=" border border-white/30 rounded-full p-2 text-lg hover:border-white hover:bg-white/10 transition-all duration-200 ease-linear cursor-pointer"
            >
              <FaFacebookF />
            </Link>
          </div>
        </div>
        <div className=" grid grid-cols-[repeat(auto-fit,_minmax(140px,_1fr))] w-full gap-2">
          <div className="flex flex-col gap-8 ">
            <h2 className=" text-white font-medium text-lg">ক্যাটাগরিসমূহ</h2>
            <ul className=" text-white/90 flex flex-col gap-1">
              {visibleCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/products?category=${category.slug}`}
                  className=" hover:text-white transition-all ease-linear duration-150"
                >
                  {category.name}
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-8 ">
            <h2 className=" text-white font-medium text-lg">দরকারী লিঙ্ক</h2>
            <ul className=" text-white/90 flex flex-col gap-1">
              <Link
                href="/"
                className=" hover:text-white transition-all ease-linear duration-150"
              >
                হোম
              </Link>
              <Link
                href="/"
                className=" hover:text-white transition-all ease-linear duration-150"
              >
                সংগ্রহ
              </Link>
              {/* <Link
                href="/"
                className=" hover:text-primary transition-all ease-linear duration-150"
              >
                ব্লগ
              </Link> */}
              <Link
                href="/"
                className="  transition-all ease-linear duration-150"
              >
                অফার
              </Link>
              <Link
                href="/"
                className="  transition-all ease-linear duration-150"
              >
                অনুসন্ধান
              </Link>
            </ul>
          </div>
          <div className="flex flex-col gap-8 ">
            <h2 className=" text-white font-medium text-lg">সহায়তা কেন্দ্র</h2>
            <ul className=" text-[#ffffffe6] flex flex-col gap-1">
              <Link
                href="/my-account/dashboard"
                className="  transition-all ease-linear duration-150"
              >
                আমার অ্যাকাউন্ট
              </Link>
              <Link
                href="/my-account/orders"
                className="  transition-all ease-linear duration-150"
              >
                আমার অর্ডার
              </Link>
              {/* <Link
                href="/view-cart"
                className="  transition-all ease-linear duration-150"
              >
                ইচ্ছার তালিকা
              </Link> */}
              {/* <Link
                href="/contact-us"
                className=" hover:text-primary transition-all ease-linear duration-150"
              >
                প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী
              </Link> */}
              <Link
                href="/contact-us"
                className="  transition-all ease-linear duration-150"
              >
                আমাদের সাথে যোগাযোগ করুন
              </Link>
            </ul>
          </div>
          <div className="flex flex-col gap-8 ">
            <h2 className=" text-white font-medium text-lg">
              লিগ্যাল ইনফরমেশন
            </h2>
            <ul className=" text-white/90 flex flex-col gap-1">
              <Link
                href="/terms"
                className=" hover:text-white transition-all ease-linear duration-150"
              >
                টার্মস এবং কন্ডিশন
              </Link>
              <Link
                href="/privacy-policy"
                className=" hover:text-white transition-all ease-linear duration-150"
              >
                প্রাইভেসি পলিসি
              </Link>
              <Link
                href="/refund-and-return-policy"
                className=" hover:text-white transition-all ease-linear duration-150"
              >
                রিফান্ড এবং রিটার্ন পলিসি
              </Link>
            </ul>
          </div>
        </div>
      </div>
      <div className=" border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:py-4 py-3 flex items-center justify-between gap-2 min-[700px]:flex-row flex-col">
          <div className="flex flex-col gap-1">
            <p className="text-white/80 text-[15px]">
              কপিরাইট © {new Date().getFullYear()} {companyName} সর্বস্বত্ব
              সংরক্ষিত
            </p>
            <p className="text-white/60 text-[14px]">
              Developed by{" "}
              <Link
                href="https://www.nexoviasoft.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white underline"
              >
                NexoviaSoft
              </Link>
            </p>
          </div>
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <Image
              src={PaymentGateway}
              alt="PaymentGateway"
              width={450}
              height={100}
              className="opacity-100"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
