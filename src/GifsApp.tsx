// import { mockGifs } from "./mocks/gifs.mock"

import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from './shared/components/SearchBar';
import { useGifs } from "./gifs/hooks/useGifs";


export const GifsApp = () => {

    const { gifs, previousTerms, handleSearch, handleTermClick, } = useGifs();


    return (
        <>

            {/* Header */}
            <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el gif perfecto" />

            {/* Search */}
            <SearchBar
                placeholder="Buscar gifs"
                onQuery={handleSearch}
            />

            {/* Previous Searches */}
            <PreviousSearches
                searches={previousTerms}
                onLabelClick={handleTermClick}
            />

            {/* Gifs */}
            <GifList gifs={gifs} />

        </>
    )
}
