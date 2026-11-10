import MeetingDetailsPage from "@/features/meetings/components/details/MeetingDetailsPage";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <MeetingDetailsPage meetingId={id} />;
}