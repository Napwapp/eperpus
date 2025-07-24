import Link from "next/link";
import Image from "next/image";

export default function Register() {
  const InputBox = ({
    type,
    placeholder,
    name,
  }: {
    type: string;
    placeholder: string;
    name: string;
  }) => {
    return (
      <div className="mb-4">
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-violet-600 focus-visible:shadow-none dark:border-dark-3 dark:text-white"
        />
      </div>
    );
  };

  return (
    <section className="bg-gray-1 min-h-screen flex items-center justify-center dark:bg-dark py-8 sm:py-20 lg:py-[120px]">
      <div className="container mx-auto px-2 border-1 border-gray-200 rounded-md">
        <div className="flex justify-center items-center">
          <div className="w-full">
            <div className="relative mx-auto w-full max-w-xs sm:max-w-md md:max-w-[525px] overflow-hidden rounded-lg bg-white px-4 sm:px-8 md:px-12 py-10 sm:py-16 dark:bg-dark-2">
              <div className="mb-10 text-center md:mb-12">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">
                  Daftar Akun Baru
                </h1>
                <div className="flex justify-center items-center flex-row">
                  <Image
                    src="/eperpus.svg"
                    alt="Logo ePerpus"
                    width={80}
                    height={80}
                    className="w-10 h-10 md:w-25 md:h-25 object-contain"
                    priority
                  />
                  <h2 className="text-3xl font-bold text-violet-700">
                    ePerpus
                  </h2>
                </div>
              </div>

              {/* Form Register */}
              <form>
                <label
                  htmlFor="nama"
                  className="text-sm font-medium text-gray-600 mb-2 block"
                >
                  Nama
                </label>
                <InputBox type="text" name="nama" placeholder="Nama lengkap" />

                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-600 mb-2 block"
                >
                  Email
                </label>
                <InputBox type="email" name="email" placeholder="Email" />

                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-600 mb-2 block"
                >
                  Password
                </label>
                <InputBox
                  type="password"
                  name="password"
                  placeholder="Password"
                />

                <label
                  htmlFor="nohp"
                  className="text-sm font-medium text-gray-600 mb-2 block"
                >
                  Nomor HP
                </label>
                <InputBox type="tel" name="nohp" placeholder="Nomor HP" />

                <label
                  htmlFor="alamat"
                  className="text-sm font-medium text-gray-600 mb-2 block"
                >
                  Alamat
                </label>
                <div className="mb-4">
                  <textarea
                    name="alamat"
                    placeholder="Alamat lengkap"
                    className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-violet-600 focus-visible:shadow-none dark:border-dark-3 dark:text-white"
                    rows={2}
                  />
                </div>

                <label className="text-sm font-medium text-gray-600 mb-2 block">
                  Kelamin
                </label>
                <div className="flex gap-6 mb-6">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="kelamin"
                      value="Laki-laki"
                      className="accent-violet-600"
                    />
                    <span className="ml-2 text-gray-700">Laki-laki</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="kelamin"
                      value="Perempuan"
                      className="accent-violet-600"
                    />
                    <span className="ml-2 text-gray-700">Perempuan</span>
                  </label>
                </div>

                <div className="mb-5">
                  <input
                    type="submit"
                    value="Daftar"
                    className="w-full cursor-pointer rounded-md border border-violet-600 bg-violet-600 px-5 py-3 text-base font-medium text-white transition hover:bg-violet-700"
                  />
                </div>
              </form>

              <div className="flex justify-center items-center">
                <p>
                  <Link
                    href="/login"
                    className="text-base text-dark hover:text-violet-500"
                  >
                    Sudah punya akun?
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
