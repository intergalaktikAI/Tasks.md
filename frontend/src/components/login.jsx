import { createSignal } from "solid-js";
import { api } from "../api";

export function Login(props) {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email(),
          password: password(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        props.onLogin(data.user);
      } else {
        const data = await response.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="login-container">
      <div class="login-box">
        <h1>Radiona Tasks</h1>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              value={email()}
              onInput={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={loading()}
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              value={password()}
              onInput={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              disabled={loading()}
            />
          </div>
          {error() && <div class="error-message">{error()}</div>}
          <button type="submit" class="login-button" disabled={loading()}>
            {loading() ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
