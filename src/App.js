import { Formik, Field, Form } from "formik";
import { useState } from "react";
import "./header.css";
import "./content.css";
import "./article.css";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const open = (url) => {
    window.open(url);
  };
  console.log(photos);
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    "Client-ID c1bQSwzRagGRjBc40QNOZxbjIP_Vm1n_S0cwNmkbYbM",
                },
              }
            );
            const data = await response.json();
            //API CALL
            setPhotos(data.results);
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map((photo) => (
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt={photo.alt_description} />
              <p>{[photo.description, photo.alt_description].join(" - ")}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
