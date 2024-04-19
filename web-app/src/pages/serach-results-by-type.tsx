import { useRouter } from "next/router";

const SearchHousingTypePage = () => {
  const router = useRouter();
  const { type } = router.query;
  
  return (
    <div>{type}</div>
  )

};


export default SearchHousingTypePage;