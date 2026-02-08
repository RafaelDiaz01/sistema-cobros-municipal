import * as AuthService from "../services/authService.js";

export const login = async (req, res) => {
  try {
    const { nombre_usuario, password_usuario } = req.body;

    const tokens = await AuthService.loginService(nombre_usuario, password_usuario);

    res
      .cookie("accessToken", tokens.accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Login correcto" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token requerido" });
    }

    const newAccessToken =
      await AuthService.refreshAccessTokenService(refreshToken);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ message: "Token renovado" });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    await AuthService.logoutService(refreshToken);

    res
      .clearCookie("accessToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      })
      .status(200)
      .json({ message: "Sesión cerrada correctamente" });

  } catch (error) {
    res.status(500).json({ message: "Error al cerrar sesión" });
  }
};
