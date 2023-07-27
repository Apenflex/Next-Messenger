import Body from '@/components/conversations/Body'
import Form from '@/components/conversations/Form'
import Header from '@/components/conversations/Header'
import EmptyState from '@/components/EmptyState'
import getConversationById from '@/utils/actions/getConversationById'
import getMessages from '@/utils/actions/getMessages'

interface IParams {
    conversationId: string
}

export default async function ConversationId({ params }: { params: IParams }) {
    const conversation = await getConversationById(params.conversationId)
    const messages = await getMessages(params.conversationId)

    if (!conversation) {
        return (
            <div className="h-full lg:pl-80">
                <div className="flex h-full flex-col ">
                    <EmptyState />
                </div>
            </div>
        )
    }
    return (
        <div className="h-full lg:pl-80">
            <div className="flex h-full flex-col">
                <Header conversation={conversation} />
                <Body initialMessages={messages} />
                <Form />
            </div>
        </div>
    )
}
