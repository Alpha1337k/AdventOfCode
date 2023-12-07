package main

import (
	"os"
	"slices"
	"sort"
	"strconv"
	"strings"
)

type HandRank int

const (
	HighCard  HandRank = 0
	Pair               = 1
	TwoPair            = 2
	ThreePair          = 3
	FullHouse          = 4
	FourPair           = 5
	FivePair           = 6
)

type Hand struct {
	Bid       int
	Cards_raw string
	Cards     map[rune]int
	Rank      HandRank
}

func NewHand(data string) Hand {
	rv := Hand{}

	splitted := strings.Split(data, " ")

	bid, err := strconv.Atoi(splitted[1])
	if err != nil {
		panic(err)
	}

	rv.Bid = bid
	rv.Cards = make(map[rune]int)
	rv.Cards_raw = splitted[0]

	for _, c := range splitted[0] {
		parsed := 0

		if c >= 48 && c <= 57 {
			parsed = int(c) - 48
		} else if c == 'T' {
			parsed = 10
		} else if c == 'J' {
			parsed = 11
		} else if c == 'Q' {
			parsed = 12
		} else if c == 'K' {
			parsed = 13
		} else if c == 'A' {
			parsed = 14
		}

		rv.Cards[rune(parsed)]++

		// println(rv.Cards[rune(parsed)], parsed)
	}

	counts := []int{}

	for _, v := range rv.Cards {
		counts = append(counts, v)
	}

	sort.Sort(sort.Reverse(sort.IntSlice(counts)))

	switch counts[0] {
	case 1:
		rv.Rank = HighCard
	case 2:
		if len(counts) >= 2 && counts[1] == 2 {
			rv.Rank = TwoPair
		} else {
			rv.Rank = Pair
		}
	case 3:
		if len(counts) >= 2 && counts[1] == 2 {
			rv.Rank = FullHouse
		} else {
			rv.Rank = ThreePair
		}
	case 4:
		rv.Rank = FourPair
	case 5:
		rv.Rank = FivePair
	}
	return rv
}

func NewHandV2(data string) Hand {
	rv := Hand{}

	splitted := strings.Split(data, " ")

	bid, err := strconv.Atoi(splitted[1])
	if err != nil {
		panic(err)
	}

	rv.Bid = bid
	rv.Cards = make(map[rune]int)
	rv.Cards_raw = splitted[0]

	for _, c := range splitted[0] {
		parsed := 0

		if c >= 48 && c <= 57 {
			parsed = int(c) - 48
		} else if c == 'T' {
			parsed = 10
		} else if c == 'J' {
			parsed = 11
		} else if c == 'Q' {
			parsed = 12
		} else if c == 'K' {
			parsed = 13
		} else if c == 'A' {
			parsed = 14
		}

		rv.Cards[rune(parsed)]++

		// println(rv.Cards[rune(parsed)], parsed)
	}

	joker_len := rv.Cards[11]

	rv.Rank = -1

	for k, v := range rv.Cards {

		if k == 11 {
			continue
		}
		count := v + joker_len
		second_highest := 0

		for k2, s := range rv.Cards {
			if k2 == k || k2 == 11 {
				continue
			}
			if s > second_highest {
				second_highest = s
			}
		}

		rank := HighCard

		switch count {
		case 1:
			rank = HighCard
		case 2:
			if second_highest == 2 {
				rank = TwoPair
			} else {
				rank = Pair
			}
		case 3:
			if second_highest == 2 {
				rank = FullHouse
			} else {
				rank = ThreePair
			}
		case 4:
			rank = FourPair
		case 5:
			rank = FivePair
		}

		if rank > rv.Rank {
			rv.Rank = rank
		}
	}
	if rv.Rank == -1 {
		rv.Rank = FivePair
	}

	return rv
}

func getParsedVal(c rune) int {
	if c >= 48 && c <= 57 {
		return int(c) - 48
	} else if c == 'T' {
		return 10
	} else if c == 'J' {
		return 0
	} else if c == 'Q' {
		return 12
	} else if c == 'K' {
		return 13
	} else if c == 'A' {
		return 14
	}
	return -1
}

func ex01() {
	dat, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(dat), "\n")

	hands := []Hand{}

	for _, line := range lines {
		hand := NewHandV2(line)

		hands = append(hands, hand)

	}

	slices.SortFunc(hands, func(a, b Hand) int {
		if a.Rank != b.Rank {
			return int(a.Rank) - int(b.Rank)
		}
		i := 0

		for ; i < 5; i++ {
			if a.Cards_raw[i] != b.Cards_raw[i] {
				break
			}
		}

		return getParsedVal(rune(a.Cards_raw[i])) - getParsedVal(rune(b.Cards_raw[i]))
	})

	total := 0

	for i, hand := range hands {
		total += hand.Bid * (i + 1)
		println(i, hand.Cards_raw, hand.Rank)
	}

	println(total)
}

func ex02() {
	dat, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(dat), "\n")

	hands := []Hand{}

	for _, line := range lines {
		hand := NewHandV2(line)

		hands = append(hands, hand)

	}

	slices.SortFunc(hands, func(a, b Hand) int {
		if a.Rank != b.Rank {
			return int(a.Rank) - int(b.Rank)
		}
		i := 0

		for ; i < 5; i++ {
			if a.Cards_raw[i] != b.Cards_raw[i] {
				break
			}
		}

		return getParsedVal(rune(a.Cards_raw[i])) - getParsedVal(rune(b.Cards_raw[i]))
	})

	total := 0

	for i, hand := range hands {
		total += hand.Bid * (i + 1)
		println(i, hand.Cards_raw, hand.Rank)
	}

	println(total)
}

func main() {
	ex02()
}
