/** @format */

"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Hotel, Room } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { Loader2, XCircle } from "lucide-react"
import axios from "axios"
import { useToast } from "../ui/use-toast"
import { Button } from "../ui/button"
import { UploadButton } from "../uploadthing"
import Image from "next/image"

interface AddRoomFormProps {
  hotel?: Hotel & {
    rooms: Room[]
  }
  room?: Room
  handleDialogueOpen: ({
    hotel,
    room,
    handleDialogueOpen,
  }: AddRoomFormProps) => void
}

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
  descrition: z.string().min(10, {
    message: "Description must be at least 10 characters long",
  }),
  bedCount: z.coerce.number().min(1, { message: "Bed count is required" }),
  guestCount: z.coerce.number().min(1, { message: "Guest count is required" }),
  bathRoomCount: z.coerce
    .number()
    .min(1, { message: "Bathroom count is required" }),
  kingBed: z.coerce.number().min(0),
  bedCqueenBenount: z.coerce.number().min(0),
  image: z.string().min(1, {
    message: "image is required",
  }),
  breackFastPrica: z.coerce.number().optional(),
  roomPrice: z.coerce.number().min(1, {
    message: "Room price is required",
  }),
  roomService: z.boolean().optional(),
  Tv: z.boolean().optional(),
  balcony: z.boolean().optional(),
  freeWifi: z.boolean().optional(),
  cityView: z.boolean().optional(),
  oceanView: z.boolean().optional(),
  forestView: z.boolean().optional(),
  mountainView: z.boolean().optional(),
  airCondition: z.boolean().optional(),
  soundProoFed: z.boolean().optional(),
})

function AddRoomForm({
  hotel,
  room,
  handleDialogueOpen: handleDialogueOpen,
}: AddRoomFormProps) {
  const [image, setImage] = useState<string | undefined>(hotel?.image)
  const [imageIsDeleting, setImageIsDeleting] = useState(false)

  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: room || {
      title: "",
      descrition: "",
      bedCount: 0,
      guestCount: 0,
      bathRoomCount: 0,
      kingBed: 0,
      bedCqueenBenount: 0,
      image: "",
      breackFastPrica: 0,
      roomPrice: 0,
      roomService: false,
      Tv: false,
      balcony: false,
      freeWifi: false,
      cityView: false,
      oceanView: false,
      forestView: false,
      mountainView: false,
      airCondition: false,
      soundProoFed: false,
    },
  })

  const hundleImageDelete = (image: string) => {
    setImageIsDeleting(true)
    const imageKey = image.substring(image.lastIndexOf("/") + 1)

    axios
      .post("/api/uploadthing/delete", { imageKey })
      .then((res) => {
        if (res.data.success) {
          setImage("")
          toast({
            variant: "success",
            description: "Image removed",
          })
        }
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Something went wrong",
        })
      })
      .finally(() => {
        setImageIsDeleting(false)
      })
  }

  return (
    <div className='max-h-[75vh} overflow-y-auto px-2'>
      <form {...form}>
        <form className='space-y-6'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room title*</FormLabel>
                <FormDescription>Provide a room name</FormDescription>
                <FormControl>
                  <Input placeholder='Double Room' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='descrition'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room description</FormLabel>
                <FormDescription>
                  Is there anything special about this room?
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder='Have a beautiful iew of the ocean while in this room'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormLabel>Choose Room Amenties</FormLabel>
            <FormDescription>
              What makes this room a good choice?
            </FormDescription>
            <div className='grid grid-cols-2 gap-2 mt-2'>
              <FormField
                control={form.control}
                name='roomService'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>24hrs Room Service</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='Tv'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>TV</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='balcony'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Balcony</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='freeWifi'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Free Wifi</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='cityView'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>City View</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='oceanView'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Ocean View</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='forestView'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Forest View</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='mountainView'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Mountain View</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='airCondition'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Air Conditioned</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='soundProoFed'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-end space-x-3 rounded-md border p-4'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Sound Proofed</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem className='flex flex-col space-y-3'>
                <FormLabel>Upload an Image</FormLabel>
                <FormDescription>
                  Choose image that will show-case your room nicely
                </FormDescription>
                <FormControl>
                  {image ? (
                    <>
                      <div className='relative max-w-[400px] min-w-[200px] max-h-[400px] min-h-[200px] mt-4'>
                        <Image
                          fill
                          src={image}
                          alt='hotel image'
                          className='object-contain'
                        />
                        <Button
                          onClick={() => hundleImageDelete(image)}
                          type='button'
                          size='icon'
                          variant='ghost'
                          className='absolute right-{-12px] top-0'>
                          {imageIsDeleting ? <Loader2 /> : <XCircle />}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='flex flex-col items-center max-w[4000px] p-12 border-2 border-dashed border-primary/50 rounded mt-4'>
                        <UploadButton
                          endpoint='imageUploader'
                          onClientUploadComplete={(res: any) => {
                            console.log("Files: ", res)
                            setImage(res[0].url)
                            toast({
                              variant: "success",
                              description: "Upload completed",
                            })
                          }}
                          onUploadError={(error: any) => {
                            toast({
                              variant: "destructive",
                              description: `ERROR! ${error.message}`,
                            })
                          }}
                        />
                      </div>
                    </>
                  )}
                </FormControl>
              </FormItem>
            )}
          />
          <div className='flex flex-row gap-6'>
            <div className='flex-1 flex flex-col gap-6'>
              <FormField
                control={form.control}
                name='roomPrice'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Price in USD</FormLabel>
                    <FormDescription>
                      State the price for staying in this room for 24hrs.
                    </FormDescription>
                    <FormControl>
                      <Input min={0} type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex-1 flex flex-col gap-6'>Part 2</div>
          </div>
        </form>
      </form>
    </div>
  )
}

export default AddRoomForm
