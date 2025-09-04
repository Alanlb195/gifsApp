import type { FC } from "react";
import type { Gif } from "../interfaces/gif.interface";

interface Props {
    gifs: Gif[];
}

export const GifList: FC<Props> = ({ gifs }) => {
    return (
        <>
            <div className="gifs-container">
                {
                    gifs.map((gif) => (
                        <div key={gif.id} className="git-card">
                            <img src={gif.url} alt={gif.title} />
                            <h3>{gif.title}</h3>
                            <p>{gif.width}x{gif.height}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
