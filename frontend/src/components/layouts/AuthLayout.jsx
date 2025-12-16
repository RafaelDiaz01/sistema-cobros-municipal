import loginImage from '../../assets/images/login-image.jpg';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#E5E7EB] flex items-center justify-center px-4">

      {/* CARD */}
      <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden flex">

        {/* LEFT SIDE */}
        <div className="w-1/2 hidden md:block">
          <img
            src={loginImage}
            alt="Imagen de Municipio"
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
