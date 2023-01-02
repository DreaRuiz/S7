
import { Checkbox } from "./components/Checkbox";
import data from "./assets/data.json";

function App() {

  return (
    <>
      <h1>¿Qué quieres hacer?</h1>

      <div>
        {data.map((item) => (
          <Checkbox 
            key={item.id} 
            textLine={item.option} 
            price={item.price} 
            id={item.id} 
 
            />

        ))}
      </div>


    </>
  );
}

export default App;
