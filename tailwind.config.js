module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        // left
        "l-sm": "-1px 0 2px 0 rgb(0 0 0 / 0.05);",
        l: "-1px 0 3px 0 rgb(0 0 0 / 0.1), -1px 0 2px -1px rgb(0 0 0 / 0.1)",
        "l-md":
          "-4px 0 6px -1px rgb(0 0 0 / 0.1), -2px 0 4px -2px rgb(0 0 0 / 0.1)",
        "l-lg":
          "-10px 0 15px -3px rgb(0 0 0 / 0.1), -4px 0 6px -4px rgb(0 0 0 / 0.1)",
        "l-xl":
          "-20px 0 25px -5px rgb(0 0 0 / 0.1), -8px 0 10px -6px rgb(0 0 0 / 0.1)",
        "l-2xl": "-25px 0 50px -12px rgb(0 0 0 / 0.25)",
        // right
        "r-sm": "1px 0 2px 0 rgb(0 0 0 / 0.05);",
        r: "1px 0 3px 0 rgb(0 0 0 / 0.1), 1px 0 2px -1px rgb(0 0 0 / 0.1)",
        "r-md":
          "4px 0 6px -1px rgb(0 0 0 / 0.1), 2px 0 4px -2px rgb(0 0 0 / 0.1)",
        "r-lg":
          "10px 0 15px -3px rgb(0 0 0 / 0.1), 4px 0 6px -4px rgb(0 0 0 / 0.1)",
        "r-xl":
          "20px 0 25px -5px rgb(0 0 0 / 0.1), 8px 0 10px -6px rgb(0 0 0 / 0.1)",
        "r-2xl": "25px 0 50px -12px rgb(0 0 0 / 0.25)",
        // top
        "t-sm": "0 -1px 2px 0 rgb(0 0 0 / 0.05);",
        t: "0 -1px 3px 0 rgb(0 0 0 / 0.1), 0 -1px 2px -1px rgb(0 0 0 / 0.1)",
        "t-md":
          "0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)",
        "t-lg":
          "0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 -4px 6px -4px rgb(0 0 0 / 0.1)",
        "t-xl":
          "0 -20px 25px -5px rgb(0 0 0 / 0.1), 0 -8px 10px -6px rgb(0 0 0 / 0.1)",
        "t-2xl": "0 -25px 50px -12px rgb(0 0 0 / 0.25)",
      },
    },
  },
  plugins: [],
};
