"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "../public/images")));
app.get("/", (req, res) => {
    console.log(path_1.default.join(__dirname, "../public"));
    const foodData = [
        {
            name: "Boilded Egg",
            text: "healthyy",
            image: "/images/egg.png",
            type: "breakfast",
        },
        {
            name: "RAMEN",
            text: "Need some korean touch.",
            image: "/images/ramen.png",
            type: "lunch",
        },
        {
            name: "GRILLED CHICKEN",
            text: "Coz why not!!",
            image: "/images/chicken.png",
            type: "dinner",
        },
        {
            name: "CAKE",
            text: "sweet tooth person.",
            image: "/images/cake.png",
            type: "dinner",
        },
        {
            name: "BURGER",
            text: "an unhealthy salad",
            image: "/images/burger.png",
            type: "lunch",
        },
        {
            name: "PANCAKE",
            text: "yum yum",
            image: "/images/pancake.png",
            type: "breakfast",
        },
    ];
    res.json(foodData);
});
app.listen(9000, () => {
    console.log("Server is running on port 9000");
});
//# sourceMappingURL=index.js.map