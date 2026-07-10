import { Box, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

/**
 * Componente Aside
 * Muestra información introductoria sobre la plataforma LicitaSeguro.
 * Incluye:
 *  - Descripción general de la plataforma.
 *  - Misión y visión destacadas.
 *  - Estilización con Material UI para presentación clara y atractiva.
 */
const Aside = () => {   
    return (
        <Box sx={{display: "flex", flexDirection: "column", padding: 2, backgroundColor: "#f5f5f5", borderRadius: 1, alignItems: "center", gap: 2, marginTop: 5}}>
            {/* Título destacado */}
            <Typography variant="h4" component="h1" sx={{color: red[600], fontWeight: 'bold'}}>
                ¿ Qué es LicitaSeguro ?
            </Typography>
            {/* Descripción general */}
            <Typography sx={{textAlign: "justify", width: "70%", fontSize: "1.2rem"}}>
               LicitaSeguro es una plataforma especializada en la publicación y gestión de licitaciones relacionadas con seguros. Su objetivo es facilitar el acceso a oportunidades de contratación en el sector asegurador, conectando empresas y entidades con proveedores adecuados.
            </Typography>
            {/* Misión */}
            <Typography sx={{textAlign: "justify", width: "70%", fontSize: "1.2rem"}}>
                <strong>Misión:</strong> Brindar transparencia y eficiencia en los procesos de licitación de seguros, asegurando que las empresas y entidades encuentren las mejores opciones disponibles de manera rápida y confiable.   
            </Typography>
            {/* Visión */}
            <Typography sx={{textAlign: "justify", width: "70%", fontSize: "1.2rem"}}>
                <strong>Visión:</strong> Convertirse en la plataforma líder en licitaciones de seguros, promoviendo la competitividad y la innovación en el sector, y garantizando procesos accesibles y equitativos para todos los participantes. 
            </Typography>
        </Box>
    );
}

export default Aside;