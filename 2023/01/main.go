package main

import (
	"os"
	"strconv"
	"strings"
)

func ex01() {
	dat, err := os.ReadFile("test.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(dat), "\n")

	possible_games := []int{}

	// max_red := 0
	// max_green := 0
	// max_blue := 0

	for lineidx, line := range lines {
		offset := strings.Index(line, ": ") + 2

		games := strings.Split(line[offset:], "; ")

		possible := true

		for _, game := range games {
			println(game)
			commands := strings.Split(game, ", ")

			red_stock := int64(12)
			green_stock := int64(13)
			blue_stock := int64(14)

			for i := 0; i < len(commands); i++ {
				split := strings.Split(commands[i], " ")
				count, err := strconv.ParseInt(split[0], 10, 8)

				if err != nil {
					panic(err)
				}

				switch split[1] {
				case "red":
					red_stock -= count
				case "green":
					green_stock -= count
				case "blue":
					blue_stock -= count
				}
			}

			if red_stock < 0 || green_stock < 0 || blue_stock < 0 {
				possible = false
			}
		}

		if possible {
			possible_games = append(possible_games, lineidx+1)
		}
	}

	sum := 0

	for _, i := range possible_games {
		println(i)

		sum += i
	}

	println(sum)
}

func ex02() {
	dat, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(dat), "\n")

	possible_games := []int{}

	for _, line := range lines {
		offset := strings.Index(line, ": ") + 2

		games := strings.Split(line[offset:], "; ")

		max_red := int64(0)
		max_green := int64(0)
		max_blue := int64(0)

		for _, game := range games {
			commands := strings.Split(game, ", ")

			red_stock := int64(0)
			green_stock := int64(0)
			blue_stock := int64(0)

			for i := 0; i < len(commands); i++ {
				split := strings.Split(commands[i], " ")
				count, err := strconv.ParseInt(split[0], 10, 8)

				if err != nil {
					panic(err)
				}

				switch split[1] {
				case "red":
					red_stock += count
				case "green":
					green_stock += count
				case "blue":
					blue_stock += count
				}
			}

			if red_stock > max_red {
				max_red = red_stock
			}
			if blue_stock > max_blue {
				max_blue = blue_stock
			}
			if green_stock > max_green {
				max_green = green_stock
			}
		}

		possible_games = append(possible_games, int(max_blue)*int(max_green)*int(max_red))
	}

	sum := 0

	for _, i := range possible_games {
		println(i)

		sum += i
	}

	println(sum)
}

func main() {
	ex02()
}
