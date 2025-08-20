import { useEffect, useState } from "react";

type RGB = {
  red: number;
  green: number;
  blue: number;
}


function App() {
  const [rgb, setRGB] = useState<RGB>({
    red: 0,
    green: 0,
    blue: 0
  })

  const [hexCode, setHexCode] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, color: string) => {
    setRGB((prev) => {
      return {
        ...prev,
        [color]: Number(e.target.value)
      }
    })
  }

  const handleColorPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    const bigint = parseInt(hex.slice(1), 16);

    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    setRGB({ red: r, green: g, blue: b });
  }

  const randomizeColor = () => {
    setRGB(prev => Object.fromEntries(
      Object.keys(prev).map(key => [key, Math.floor(Math.random() * 256)])
    ) as RGB)
  }

  const reset = () => {
    setRGB((prev) => Object.fromEntries(
      Object.keys(prev).map(key => [key, 0])
    ) as RGB)
  }

  const convertToHex = () => {
    const toHex = (n: number) => n.toString(16).padStart(2, "0");
    setHexCode(`#${toHex(rgb.red)}${toHex(rgb.green)}${toHex(rgb.blue)}`);
  }

  useEffect(() => {
    randomizeColor()
  }, [])

  useEffect(() => {
    const page = document.getElementById("page");
    page!.style.backgroundColor = `rgb(${rgb.red},${rgb.green},${rgb.blue})`;
    convertToHex();
  }, [rgb])


  return (
    <main id="page" className="min-h-screen flex justify-center items-end transition-colors duration-200 relative">
      {/* Hex code */}
      <div className="min-h-screen flex justify-center items-center absolute">
        <div className="text-center text-3xl text-white font-mono uppercase glass bg-black/40 backdrop-blur-3xl px-6 md:px-18 py-18  rounded-lg ">
          <p>{hexCode}</p>
          <p className="lowercase">rgb({rgb.red},{rgb.green},{rgb.blue})</p>
        </div>
      </div>

      {/* Dock */}
      <div className="card mx-auto bg-base-300 mb-8 md:rounded-full">
        <form onSubmit={(e) => e.preventDefault()} className="card-body flex-col md:flex-row items-center py-3 space-y-2.5 md:space-x-2 md:space-y-0" >
          <div className="inline-flex items-center w-full space-x-2">
            <label className="select-none">RGB:</label>
            {
              (Object.keys(rgb) as (keyof typeof rgb)[]).map((key) => (
                <input key={key} type="number" min={0} max={255} value={rgb[key]} className="input" onChange={(e) => handleChange(e, key)} />
              ))
            }
          </div>

          <div className="flex items-center">
            <input type="color" value={hexCode} className="rounded-full w-8 h-8 outline-1" onChange={handleColorPick} />
          </div>

          <div className="card-actions flex-nowrap space-x-2">
            <button className="btn btn-accent" onClick={randomizeColor}>Randomize</button>
            <button className="btn btn-secondary" onClick={reset}>Reset</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default App;