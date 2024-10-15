import { FC, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { API } from "@/utils/api";
import { Navigate, useNavigate } from "react-router-dom";

interface Shop {
  _id: string;
  shopName: string;
  address: string;
  contactNo: string;
  picture: string;
}

export const Shops: FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const navigate = useNavigate();

  const fetchShopDetails = async () => {
    try {
      const res = await axios.get(`${API}/api/v1/shop`);
      console.log("response", res.data);
      setShops(res.data);
    } catch (error) {
      console.log("Failed to fetch the shop details", error);
    }
  };

  const handleShopDetailsClick = () => {
    navigate("/shop/details");
  };

  useEffect(() => {
    fetchShopDetails();
  }, []);

  return (
    <div className="px-6 md:px-[200px]">
      <h1 className="font-extrabold text-black flex justify-center mt-4 mb-4 text-4xl">
        Shops
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {shops.map((shop) => (
          <Card
            key={shop._id}
            className="cursor-pointer"
            onClick={handleShopDetailsClick}
          >
            <img
              src={shop.picture}
              alt={shop.shopName}
              className="h-48 w-full object-cover rounded-t-md"
            />
            <CardHeader>
              <CardTitle className="text-2xl">{shop.shopName}</CardTitle>
              <CardDescription>{shop.address}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                <span className="font-bold">Contact</span>: {shop.contactNo}
              </p>
            </CardContent>
            <CardFooter>
              <p>
                <span className="font-bold">Shop ID</span>: {shop._id}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
