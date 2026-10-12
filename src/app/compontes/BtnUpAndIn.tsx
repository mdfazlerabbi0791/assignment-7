"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BtnUpAndIn = () => {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signIn");
        },
      },
    });
  };

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-gray-100"
          >
            {user.image ? (
              <img
                src={user.image}
                alt="User Profile"
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold uppercase text-white">
                {user.name?.trim().charAt(0) || "U"}
              </div>
            )}

            <span className="text-lg font-semibold text-gray-800">
              {user.name?.split(" ")[0] || "User"}
            </span>

            <span className="text-xs text-gray-500">▼</span>
          </div>

          <ul
            tabIndex={0}
            className="menu dropdown-content z-[100] mt-3 w-72 rounded-2xl border border-gray-200 bg-white p-5 shadow-xl sm:w-80"
          >
            <li className="mb-4 border-b border-gray-100 pb-4">
              <div className="pointer-events-none flex flex-col items-start gap-1 whitespace-normal">
                <span className="text-lg font-bold text-gray-800">
                  {user.name}
                </span>

                <span className="break-all text-sm font-normal text-gray-500">
                  {user.email}
                </span>
              </div>
            </li>

            <li>
              <Link
                href="/profile"
                className="py-3 text-base text-gray-800 hover:bg-gray-100"
              >
                👤 আমার প্রোফাইল
              </Link>
            </li>

            <li>
              <button
                onClick={() => handleSignOut()}
                className="py-3 text-base text-red-500 hover:bg-red-50"
              >
                ↩ সাইন আউট
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex gap-3">
          <Link href="/signIn">
            <button className="btn">সাইন ইন</button>
          </Link>

          <Link href="/signUp">
            <button className="btn btn-primary">সাইন আপ</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BtnUpAndIn;
