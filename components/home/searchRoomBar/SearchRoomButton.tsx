import React from "react";
import Link from "next/link";
import { useSelector } from "../../../store";
import Button from "../../common/Button";
import SearchIcon from "../../../public/static/svg/search/white_search.svg";
import { makeQueryString } from "../../../lib/utils";

const SearchRoomButton: React.FC = () => {
  const searchRoom = useSelector((state:any)=>state.searchRoom)

  const roomListHref = makeQueryString("/room",searchRoom)
  console.log(roomListHref)
  return (
    <Link href={roomListHref}>
        <Button icon={<SearchIcon />} color="amaranth" width="100px">
          검색
        </Button>
    </Link>
  );
};

export default SearchRoomButton;
