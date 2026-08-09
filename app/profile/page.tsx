"use client";

import { useEffect, useState } from "react";
import {
  User,
  Moon,
  Languages,
  Info,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";


export default function ProfilePage() {

  const { lang, toggleLang, t } = useLanguage();

  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {

    const savedMode = localStorage.getItem("darkMode") === "true";

    if (savedMode) {
      document.documentElement.classList.add("dark");
    }

    queueMicrotask(() => setDarkMode(savedMode));

  }, []);



  const toggleDarkMode = () => {

    const newMode = !darkMode;

    setDarkMode(newMode);

    if (newMode) {

      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");

    } else {

      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");

    }

  };



  return (

    <main className="
      min-h-screen
      bg-gray-50
      dark:bg-gray-950
      px-4
      py-8
      sm:px-8
    ">


      <section className="
        mx-auto
        max-w-md
      ">



        {/* Profile Header */}

        <div className="
          rounded-3xl
          bg-white
          dark:bg-gray-800
          p-8
          text-center
          shadow-sm
        ">


          <div className="
            mx-auto
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            bg-[#F1E194]
            text-[#5B8E14]
          ">

            <User size={45}/>

          </div>


          <h1 className="
            mt-4
            text-2xl
            font-bold
            dark:text-white
          ">
            {t("profile.guest")}
          </h1>


          <p className="
            text-gray-500
            dark:text-gray-300
          ">
            {t("profile.welcome")}
          </p>


        </div>





        {/* Preferences */}


        <div className="
          mt-6
          rounded-3xl
          bg-white
          dark:bg-gray-800
          p-5
          shadow-sm
        ">


          <h2 className="
            mb-4
            text-lg
            font-bold
            dark:text-white
          ">
            {t("profile.preferences")}
          </h2>





          {/* Dark Mode */}


          <div className="
            flex
            items-center
            justify-between
            rounded-2xl
            p-3
            hover:bg-gray-50
            dark:hover:bg-gray-700
          ">


            <div className="
              flex
              items-center
              gap-3
            ">


              <div className="
                rounded-full
                bg-gray-100
                dark:bg-gray-700
                p-2
              ">

                <Moon 
                  size={20}
                  className="dark:text-white"
                />

              </div>


              <span className="dark:text-white">
                {t("profile.darkMode")}
              </span>


            </div>





            <button
              onClick={toggleDarkMode}
              className={`
                h-6
                w-11
                rounded-full
                p-1
                transition
                ${
                  darkMode
                  ? "bg-[#5B8E14]"
                  : "bg-gray-300"
                }
              `}
            >

              <div
                className={`
                  h-4
                  w-4
                  rounded-full
                  bg-white
                  transition-transform
                  ${
                    darkMode
                    ? "translate-x-5"
                    : ""
                  }
                `}
              />


            </button>



          </div>






          {/* Language */}


          <button
            onClick={toggleLang}
            aria-label="Switch language"
            className="
              mt-2
              flex
              w-full
              items-center
              justify-between
              rounded-2xl
              p-3
              hover:bg-gray-50
              dark:hover:bg-gray-700
            "
          >


            <div className="
              flex
              items-center
              gap-3
            ">


              <div className="
                rounded-full
                bg-gray-100
                dark:bg-gray-700
                p-2
              ">

                <Languages
                  size={20}
                  className="dark:text-white"
                />

              </div>


              <span className="dark:text-white">
                {t("profile.language")}
              </span>


            </div>


            <div className="
              flex
              items-center
              gap-1
              text-gray-400
            ">
              <span>
                {lang === "en" ? t("profile.languageEn") : t("profile.languageAm")}
              </span>

              <ChevronRight
                size={20}
              />
            </div>


          </button>







          {/* About */}


          <button className="
            mt-2
            flex
            w-full
            items-center
            justify-between
            rounded-2xl
            p-3
            hover:bg-gray-50
            dark:hover:bg-gray-700
          ">


            <div className="
              flex
              items-center
              gap-3
            ">


              <div className="
                rounded-full
                bg-gray-100
                dark:bg-gray-700
                p-2
              ">


                <Info 
                  size={20}
                  className="dark:text-white"
                />


              </div>


              <span className="dark:text-white">
                {t("profile.aboutUs")}
              </span>


            </div>


            <ChevronRight 
              size={20}
              className="text-gray-400"
            />


          </button>




        </div>



      </section>


    </main>

  );
}