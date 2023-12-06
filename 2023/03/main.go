package main

import (
	"os"
	"regexp"
	"slices"
	"strconv"
	"strings"
)

func ex01() {
	dat, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(dat), "\n")

	total := 0

	for _, line := range lines {
		line = line[strings.Index(line, ":")+2:]
		cards := strings.Split(line, " | ")

		re := regexp.MustCompile("\\s+")

		player_card_str := re.Split(cards[0], -1)
		check_card_str := re.Split(cards[1], -1)

		player_cards := []int64{}
		check_cards := []int64{}

		for i := range player_card_str {
			if player_card_str[i] == "" {
				continue
			}

			player, err := strconv.ParseInt(player_card_str[i], 10, 32)
			if err != nil {
				panic(err)
			}

			player_cards = append(player_cards, player)
		}

		for i := range check_card_str {
			if check_card_str[i] == "" {
				continue
			}

			check, err := strconv.ParseInt(check_card_str[i], 10, 32)
			if err != nil {
				panic(err)
			}

			check_cards = append(check_cards, check)
		}

		total_found := 0

		for _, card := range player_cards {
			if slices.IndexFunc(check_cards, func(i int64) bool { return i == card }) != -1 {
				if total_found == 0 {
					total_found++
				} else {
					total_found *= 2
				}
			}
		}

		total += total_found
	}

	println(total)
}

func ex02() {
	dat, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(dat), "\n")

	scores := make([]int, len(lines))
	for i := range scores {
		scores[i] = 1
	}

	for line_idx, line := range lines {
		line = line[strings.Index(line, ":")+2:]
		cards := strings.Split(line, " | ")

		re := regexp.MustCompile("\\s+")

		player_card_str := re.Split(cards[0], -1)
		check_card_str := re.Split(cards[1], -1)

		player_cards := []int64{}
		check_cards := []int64{}

		for i := range player_card_str {
			if player_card_str[i] == "" {
				continue
			}

			player, err := strconv.ParseInt(player_card_str[i], 10, 32)
			if err != nil {
				panic(err)
			}

			player_cards = append(player_cards, player)
		}

		for i := range check_card_str {
			if check_card_str[i] == "" {
				continue
			}

			check, err := strconv.ParseInt(check_card_str[i], 10, 32)
			if err != nil {
				panic(err)
			}

			check_cards = append(check_cards, check)
		}

		found_count := 0

		for _, card := range player_cards {
			if slices.IndexFunc(check_cards, func(i int64) bool { return i == card }) != -1 {
				found_count++
				scores[line_idx+found_count] += scores[line_idx]
			}
		}

	}

	total := 0
	for idx, score := range scores {
		println(idx, score)
		total += score
	}

	println("TT", total)
}

func main() {
	ex02()
}
