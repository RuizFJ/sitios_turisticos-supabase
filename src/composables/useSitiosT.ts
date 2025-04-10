import type AddSitioTuristico from "~/interfaces/addSitioTuristico.interface";
import type Categoria from "~/interfaces/categoria.interface";
import type Ciudad from "~/interfaces/ciudad.interface";
import type SitioTuristico from "~/interfaces/sitioTuristico.interface";

export function useSitiosT() {
  const client:any = useSupabaseClient(); // This is a function that returns the supabase client

  const { data, error } = useAsyncData<SitioTuristico[] | null>(
    "sitio_turistico",
    async () => {
      const { data, error } = await client.from("sitio_turistico").select(`
                id,
                nombre,
                descripcion,
                direccion,
                active,
                categoria_id (
                nombre
                ),
                ciudad_id (
                nombre
                )
            `).eq("active", true);
      if (error) {
        console.error("Error al obtener los sitios turístico:", error);
        return null;
      }
     
      return data || null;
    }
  );

  const obtenerSitioTuristicoById = async (id: number) => {
    const { data, error } = await client
      .from("sitio_turistico")
      .select(`
                id,
                nombre,
                descripcion,
                direccion,
                active,
                categoria_id (
                id
                ),
                ciudad_id (
                id
                )
            `)
      .eq("id", id)
      .single();
    if (error) {
      alert("Error al obtener el sitio turístico");
      console.error("Error al obtener el sitio turístico:", error);
      return null;
    } 
    return data || null;
  };

  const eliminarSitio = async (id: number) => {
    const { error } = await client
      .from("sitio_turistico")
        .update({ active: false })
      .eq("id", id);

    if (error) {
      console.error("Error al eliminar sitio turistico:", error);
    } else {
      alert("Sitio turistico eliminado");
      return id;
    }
  };

  const categorias = useAsyncData<Categoria[] | null>("categoria", async () => {
    const { data, error } = await client.from("categoria").select(`
                id,
                nombre
            `);
    if (error) {
      console.error("Error al obtener las categorias:", error);
      return null;
    }
    return data || null;
  });

  const ciudades = useAsyncData<Ciudad[] | null>("ciudad", async () => {
    const { data, error } = await client.from("ciudad").select(`
                id,
                nombre
            `);
    if (error) {
      console.error("Error al obtener las ciudades:", error);
      return null;
    }
    return data || null;
  });

 /* const agregarSitio = async (sitio: AddSitioTuristico) => {
    const { error } = await client.from("sitio_turistico").insert({
      nombre: sitio.nombre,
      descripcion: sitio.descripcion,
      direccion: sitio.direccion,
      categoria_id: sitio.categoria_id,
      ciudad_id: sitio.ciudad_id,
    });
    if (error) {
      console.error("Error al agregar el sitio turístico:", error);
      return null;
    }

    alert("Sitio turístico agregado");

  };*/

  return { data, error, eliminarSitio, obtenerSitioTuristicoById,  categorias, ciudades };
}
