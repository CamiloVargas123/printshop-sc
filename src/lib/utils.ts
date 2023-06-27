import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function className(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

export function unslugify(str: string) {
  return str.replace(/-/g, " ")
}

export function sortArrayString(arr: string[]) {
  return arr.sort((a, b) => a.localeCompare(b))
}