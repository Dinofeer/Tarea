import { useState, useEffect, useTransition } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition(); // React 19: Mejor manejo de transiciones

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Ingrese un email válido");
      return;
    }
    setError("");

    startTransition(() => {
      localStorage.setItem("email", email);
      alert("Inicio de sesión exitoso");
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Login</h2>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingrese su email"
          required
        />
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={isPending}>
          {isPending ? "Cargando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default Login;
