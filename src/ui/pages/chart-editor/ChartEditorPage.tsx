import { DeleteIcon, EditIcon, LinkIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Collapse,
  Container,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack
} from "@chakra-ui/react"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import exportFromJSON from "export-from-json"
import { Chart } from "../../../types/chart"
import CommonService from "../../../lib/services/common_service"
import ChartService from "../../../lib/services/chart_service"
import { RAW_CHART_SEPT_18 } from "../../../../database/sept_18"

const DataChecking = () => {
  const [videos, setVideos] = useState<Chart[]>([])

  const [title, setTitle] = useState("")
  const [artist, setArtist] = useState("")
  const [voiceBank, setVoiceBank] = useState("")

  const [editOpen, setEditOpen] = useState("")

  const common = new CommonService()
  const chart = new ChartService()

  useEffect(() => {
    const getData = async () => {
      const array: Chart[] = []
      for (let index = 0; index < RAW_CHART_SEPT_18.length; index++) {
        const element = RAW_CHART_SEPT_18[index]

        const res = await common.getVideo(element.id)

        const data = res.getValue()

        if (data.show) {
          // array.push({ ...data, isNew: element.isNew, score: element.score, views: element.views })
          array.push({ ...data, isNew: element.isNew, score: element.score })
        }
      }

      setVideos(array)
    }

    getData()
  }, [])

  const ignoreVideo = (index: number, id: string) => async () => {
    const video = [...videos]
    video.splice(index, 1)

    await chart.ignoreVideo(id)

    setVideos(video)
  }

  const updateVideo = (item: Chart) => async () => {
    await chart.updateVideo({
      id: item.videoYoutubeId,
      artist,
      title,
      voiceBank
    })

    setArtist("")
    setTitle("")
    setVoiceBank("")
    setEditOpen("")
  }

  const submitChart = async () => {
    for (let i = 0; i < 20; i++) {
      const element = videos[i]

      await chart.initChart(element.videoYoutubeId, {
        position: i + 1,
        data: element,
        month: "September 2021",
        week: 12
      })
    }
  }

  const submitKafuChart = async () => {
    for (let i = 0; i < 20; i++) {
      const element = videos[i]

      await chart.initKafuChart(element.videoYoutubeId, {
        position: i + 1,
        data: element,
        month: "August",
        week: 2
      })
    }
  }

  const goToVideo = (link: string) => () => {
    window.open(`https://www.youtube.com/watch?v=${link}`)
  }

  const getNewChartInfo = () => {
    const chart = []
    for (let i = 0; i < 10; i++) {
      const element = videos[i]

      chart.push({
        id: element.videoYoutubeId,
        videoYoutubeId: element.videoYoutubeId,
        score: element.score,
        views: element.views
      })
    }
    exportFromJSON({ data: chart.splice(0, 10), fileName: "chart_aug_21", exportType: "json" })
  }

  return (
    <>
      <Head>
        <title>Chart Maker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="container.lg" className="raw_chart">
        <Flex>
          <Button onClick={submitChart} colorScheme="blue" size="lg">
            Submit Chart
          </Button>

          <Box w="10px" />

          <Button onClick={submitKafuChart} colorScheme="cyan" size="lg">
            Submit Kafu Chart
          </Button>

          <Box w="10px" />

          <Button onClick={getNewChartInfo} colorScheme="teal" size="lg">
            Get New Chart
          </Button>

          <Box w="10px" />
        </Flex>

        <Box h="40px" />

        {videos.map((item, i) => (
          <div key={i} className="raw_chart__card">
            <div className="raw_chart__card__body">
              <div className="raw_chart__card__index">{i + 1}</div>
              <img src={item.picture} alt="" />
              <div className="raw_chart__card__info">
                <div className="raw_chart__card__info__title">
                  Title: {item.title ?? item.originalTitle}
                </div>
                <div className="raw_chart__card__info__artist">Artist: {item.customArtist}</div>
                <div className="raw_chart__card__info__artist">Voice Bank: {item.voiceBank}</div>
              </div>
              <div className="raw_chart__card__handler">
                {!item.title ? (
                  <>
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={ignoreVideo(i, item.videoYoutubeId)}
                      aria-label="Ignore button"
                    />
                  </>
                ) : null}
                <IconButton
                  icon={<LinkIcon />}
                  onClick={goToVideo(item.videoYoutubeId)}
                  aria-label="Open video"
                />
                {!item.title && !editOpen ? (
                  <IconButton
                    icon={<EditIcon />}
                    onClick={() => setEditOpen(item.id)}
                    aria-label="Edit button"
                  />
                ) : null}
              </div>
            </div>

            <div className="raw_chart__card__collapse">
              <Collapse in={editOpen === item.id} animateOpacity>
                <Stack spacing={3}>
                  <FormControl id="title">
                    <FormLabel>Title</FormLabel>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                  </FormControl>

                  <FormControl id="artist">
                    <FormLabel>Artist</FormLabel>
                    <Input value={artist} onChange={(e) => setArtist(e.target.value)} />
                  </FormControl>

                  <FormControl id="voiceBank">
                    <FormLabel>Voice Bank</FormLabel>
                    <Input value={voiceBank} onChange={(e) => setVoiceBank(e.target.value)} />
                  </FormControl>
                </Stack>

                <Box h="10px" />

                <Stack direction="row" spacing={4}>
                  <Button colorScheme="teal" variant="outline" onClick={() => setEditOpen("")}>
                    Cancel
                  </Button>
                  <Button colorScheme="teal" variant="solid" onClick={updateVideo(item)}>
                    Edit
                  </Button>
                </Stack>
              </Collapse>
            </div>
          </div>
        ))}
      </Container>
    </>
  )
}

export default DataChecking
