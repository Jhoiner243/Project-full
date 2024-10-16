import { useRouteError } from "react-router-dom";
export default function ErrorPage  () {
  const error = useRouteError();
  console.error(error);

  // Verificación para asegurarnos de que el error es del tipo que esperamos
  if (error instanceof Error) {
    return (
      <div id="error-page" >
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.message}</i> {/* Mostramos el mensaje del error */}
        </p>
      </div>
    );
  }

  // Si el error no es una instancia de Error, mostramos un mensaje genérico
  return (
    <div id="error-page" >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>Unknown Error</i> {/* Para casos donde no sabemos qué tipo de error es */}
      </p>
    </div>
  );
}
