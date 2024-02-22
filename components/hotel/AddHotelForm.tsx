'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Hotel, Room } from "@prisma/client"
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
import { Textarea } from "../ui/textarea"
import { Checkbox } from "../ui/checkbox"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { UploadButton } from "../uploadthing"

interface AddHotelFormPropps {
  hotel: HotelWithRooms | null
}

export type HotelWithRooms = Hotel & {
  rooms: Room[]
}

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters long",
  }),
  image: z.string().min(2, {
    message: "image is required",
  }),
  country: z.string().min(1, {
    message: "country is required",
  }),
  state: z.string().optional(),
  city: z.string().optional(),
  locationDescription: z.string().min(10, {
    message: "Description must be atlest 10 characters long",
  }),
  gym: z.boolean().optional(),
  spa: z.boolean().optional(),
  bar: z.boolean().optional(),
  laundry: z.boolean().optional(),
  restaurant: z.boolean().optional(),
  shoping: z.boolean().optional(),
  freeParking: z.boolean().optional(),
  bikeRental: z.boolean().optional(),
  freewifi: z.boolean().optional(),
  movieNight: z.boolean().optional(),
  swimmingPool: z.boolean().optional(),
  coffeeShop: z.boolean().optional(),
})

export default function AddHotelForm({ hotel }: AddHotelFormPropps) {

  const [image, setImage] = useState<string | undefined>(hotel?.image)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      country: "",
      state: "",
      city: "",
      locationDescription: "",
      gym: false,
      spa: false,
      bar: false,
      laundry: false,
      restaurant: false,
      shoping: false,
      freeParking: false,
      bikeRental: false,
      freewifi: false,
      movieNight: false,
      swimmingPool: false,
      coffeeShop: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <h3 className='text-lg font-semibold'>
            {hotel ? "update yout hotel" : "Describe your hotel!"}
          </h3>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='flex-1 flex flex-col gap-6'>
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel title</FormLabel>
                    <FormDescription>Provide your hotel name</FormDescription>
                    <FormControl>
                      <Input placeholder='Beach hotel' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Description</FormLabel>
                    <FormDescription>
                      Provide a detailed description of your hotel
                    </FormDescription>
                    <FormControl>
                      <Textarea
                        placeholder='Beach hotel is parked width many awesome amenitie!'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Choose Amenitie</FormLabel>
                <FormDescription>
                  Choose Amenities popular is your hotel
                </FormDescription>
                <div className='grid grid-cols-3 gap-4 mt-2'>
                  <FormField
                    control={form.control}
                    name='gym'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end space-x-3 rounded-md p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Gym</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='spa'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end space-x-3 rounded-md p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Spa</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='bar'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end space-x-3 rounded-md p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Spa</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='laundry'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end space-x-3 rounded-md p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Laundry Facilities</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='restaurant'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end space-x-3 rounded-md p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Restaurant</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='shoping'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end space-x-3 rounded-md p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Shoping</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='bikeRental'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end space-x-3 rounded-md p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl> 
                        <FormLabel>Bike Rental</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='freewifi'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end space-x-3 rounded-md p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl> 
                        <FormLabel>Free wifi</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='movieNight'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end space-x-3 rounded-md p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl> 
                        <FormLabel>Movie Night</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='swimmingPool'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end space-x-3 rounded-md p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl> 
                        <FormLabel>Swimming Pool</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='coffeeShop'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-end space-x-3 rounded-md p-4'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl> 
                        <FormLabel>Coffee Shop</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({field}) => (
                  <FormItem className="flex flex-col space-y-3">
                    <FormLabel>Upload an Image</FormLabel>
                    <FormDescription>Choose image that will show-case your hotel nicely</FormDescription>
                    <FormControl>
                      {image ? 
                        <></> : 
                        <>
                          <div className="flex flex-col items-center max-w[4000px] p-12 border-2 border-dashed border-primary/50 rounded mt-4">
                            <UploadButton
                              endpoint="imageUploader"
                              onClientUploadComplete={(res: any) => {
                                console.log("Files: ", res);
                                alert("Upload Completed");
                              }}
                              onUploadError={(error: Error) => {
                                // Do something with the error.
                                alert(`ERROR! ${error.message}`);
                              }}
                            />
                          </div>
                        </>
                      }
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className='flex-1 flex flex-col gap-6'>Part 2</div>
          </div>
        </form>
      </Form>
    </div>
  )
}

