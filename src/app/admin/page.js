import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ROLES } from "../lib/roles";

export async function getServerSideProps(context) {
  
  const session = await getSession(context);

  if (!session || session.user.role !== ROLES.ADMIN) {
    return {
      redirect: {
        destination: "/unauthorized",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      router.replace('/unauthorized');
    }
  }, []);
  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center">
      <img
        src="/icon.png"
        alt="Logo"
        className="h-24 w-auto mb-4"
      />
      <h1 className="text-3xl font-bold text-center mt-10">Admin Page</h1>
      <p className="text-center mt-4">Welcome to the admin page!</p>
    </div>
  );
}