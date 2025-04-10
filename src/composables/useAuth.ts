export default function useAuth() {
    const login = async (email: string, password: string) => {
      const supabase = useSupabaseClient(); // This is a function that returns the supabase client
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        alert("Error al iniciar sesión");
        throw console.error(error.message);
      } else {
        navigateTo("/");
      }
    };
    return { login };
  }
  