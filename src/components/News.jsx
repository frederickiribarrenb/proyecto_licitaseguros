import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import news1 from "../assets/creacion.jpg";
import news2 from "../assets/ofertas.jpg";
import news3 from "../assets/resolu-problem.jpg";
import news4 from "../assets/adjudicadas.jpg";
import news5 from "../assets/Finance.jpg"
import data from "../json/data.json";

// Mapeo de nombres de imagen a importaciones reales
// Permite asociar dinámicamente las imágenes a cada sección según el nombre en el JSON
const imageMap = {
  news1,
  news2,
  news3,
  news4,
  news5
};

/**
 * Componente News
 * Muestra una lista de secciones de noticias relacionadas con procesos de licitación.
 * Cada sección incluye un título, una imagen y una lista de empresas con descripciones.
 * Los datos provienen de un archivo JSON y las imágenes se asignan dinámicamente.
 */
const News = () => {
  // Asigna la imagen real a cada sección usando el nombre del JSON
  const sections = data.map((section) => ({
    ...section,
    image: imageMap[section.image] || "",
  }));

  return (
    <Box>
      {/* Título principal */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2,
          paddingLeft: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ color: "red" }}>
          Actualización de Procesos de Licitación
        </Typography>
      </Box>
      {/* Renderiza cada sección como una tarjeta */}
      <Grid
        container
        spacing={3}
        sx={{ mt: 2, mb: 2, justifyContent: "center" }}
      >
        {sections.map((section) => (
          <Box key={section.title} sx={{ width: { xs: '100%', md: '83.333333%' } }}>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                background: "#f5f7fa",
                borderRadius: 3,
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                p: { xs: 2, md: 3 },
              }}
            >
              {/* Imagen de la sección */}
              <CardMedia
                component="img"
                image={section.image}
                alt={section.title}
                sx={{
                  width: { xs: "100%", md: 260 },
                  height: 180,
                  borderRadius: 2,
                  objectFit: "cover",
                  mr: { md: 3 },
                  mb: { xs: 2, md: 0 },
                  boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                }}
              />
              <CardContent sx={{ flex: 1 }}>
                {/* Título de la sección */}
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    color: "#1976d2",
                    letterSpacing: 1,
                    mb: 1,
                    textAlign: { xs: "center", md: "left" },
                  }}
                >
                  {section.title}
                </Typography>
                {/* Lista de empresas y descripciones */}
                <List dense>
                  {section.items.map((item, i) => (
                    <Box key={item.company}>
                      <ListItem alignItems="flex-start" disableGutters>
                        <ListItemText
                          primary={
                            <Typography fontWeight="bold" color="primary">
                              {item.company}
                            </Typography>
                          }
                          secondary={
                            <Typography color="text.secondary" variant="body2">
                              {item.desc}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {i < section.items.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </Box>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default News;
