import type AddCategoria from "~/interfaces/addCategoria.interface";
import type AddCiudad from "~/interfaces/addCiudad.interface";
import type Categoria from "~/interfaces/categoria.interface";
import type Ciudad from "~/interfaces/ciudad.interface";

export function useCiudades() {
    const client:any = useSupabaseClient();

    const {data,error} = useAsyncData<Ciudad[] | null>(
        "ciudad",
        async () => {
            const { data, error } = await client.from("ciudad").select(`
                id,
                nombre
                
            `).eq("active", true);
            if (error) {
                console.error("Error al obtener las ciudades:", error);
                return null;
            }
            return data || null;
        }

    );

    const registrarCiudad = async (ciudad: AddCiudad) => {
        const { data, error } = await client
            .from("ciudad")
            .insert([
                {
                    nombre: ciudad.nombre,
                },
            ]);
        if (error) {
            alert("Error al registrar la ciudad");
            console.error("Error al registrar la ciudad:", error);
            return null;
        }
        return error;

    }

    const eliminarCiudad = async (id: number) => {
        const { error } = await client
            .from("ciudad")
            .delete()
            .eq("id", id);
        if (error) {
            alert("Error al eliminar la ciudad");
            console.error("Error al eliminar la ciudad:", error);
            return null;
        }
        return error;
    };
    return {data,error,registrarCiudad, eliminarCiudad};

}